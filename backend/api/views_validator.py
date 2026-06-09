from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.core.files.base import ContentFile
from django.conf import settings
from .models import ValidationRecord
import polars as pl
import io
import json
import logging

logger = logging.getLogger(__name__)

class SubmissionValidatorView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file')
        tasks_json = request.data.get('tasks')
        
        if not file or not tasks_json:
            logger.warning(f"User {request.user.id} attempted validation without file or tasks.")
            return Response({"detail": "File or tasks missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            tasks = json.loads(tasks_json)
            df = pl.read_csv(io.BytesIO(file.read()))
            
            # --- PILLAR 3: SUBMISSION VALIDATOR 'SAFETY BELT' ---
            # Correctly sum null counts across all columns
            total_missing = df.null_count().sum_horizontal().item()
            
            validation_report = {
                "format_check": "Passed",
                "missing_values": total_missing,
                "row_count": len(df),
                "columns": list(df.columns),
                "warnings": []
            }
            
            # Check for NaN/Nulls (Pillar 3 specific)
            if total_missing > 0:
                validation_report["warnings"].append(f"Found {total_missing} missing values (NaN). This might cause submission rejection.")
            
            # Check for common Kaggle/Zindi issues
            if "id" not in [c.lower() for c in df.columns]:
                validation_report["warnings"].append("Missing 'id' column. Most competitions require an identifier column.")
            
            # --------------------------------------------------

            report = {"tasks_completed": [], "validation_report": validation_report}
            
            logger.info(f"Processing validation for file: {file.name}, user: {request.user.id}")
            
            for task in tasks:
                if not task.get('completed'): continue
                task_id = task.get('id')
                
                if task_id == 1:
                    for col in df.columns:
                        if df[col].null_count() > 0:
                            if df[col].dtype in [pl.Int64, pl.Float64]: 
                                # Calculate mean explicitly and fill with literal
                                mean_val = df[col].mean()
                                fill_val = mean_val if mean_val is not None else 0
                                df = df.with_columns(pl.col(col).fill_null(pl.lit(fill_val)))
                            else: 
                                # Safely get mode and fill with literal
                                mode_val = df[col].mode()
                                fill_val = mode_val[0] if len(mode_val) > 0 and mode_val[0] is not None else ""
                                df = df.with_columns(pl.col(col).fill_null(pl.lit(fill_val)))
                    report["tasks_completed"].append("Missing values handled")
                elif task_id == 2:
                    before = len(df)
                    df = df.unique()
                    report["tasks_completed"].append(f"Duplicates removed: {before - len(df)}")
                elif task_id == 3:
                    cat_cols = df.select(pl.col(pl.Utf8)).columns
                    if cat_cols: df = df.to_dummies(cat_cols); report["tasks_completed"].append("Categorical variables encoded")
                elif task_id == 4:
                    num_cols = df.select(pl.col(pl.Float64, pl.Int64)).columns
                    for col in num_cols: df = df.with_columns((pl.col(col) - pl.col(col).mean()) / pl.col(col).std())
                    report["tasks_completed"].append("Features scaled")
                elif task_id == 5:
                    num_cols = df.select(pl.col(pl.Float64, pl.Int64)).columns
                    for col in num_cols:
                        q1 = df[col].quantile(0.25)
                        q3 = df[col].quantile(0.75)
                        iqr = q3 - q1
                        df = df.filter((pl.col(col) >= q1 - 1.5 * iqr) & (pl.col(col) <= q3 + 1.5 * iqr))
                    report["tasks_completed"].append("Outliers removed via IQR")
                elif task_id == 6:
                    num_cols = df.select(pl.col(pl.Float64, pl.Int64)).columns
                    if len(num_cols) >= 2:
                        df = df.with_columns((pl.col(num_cols[0]) * pl.col(num_cols[1])).alias(f"{num_cols[0]}_x_{num_cols[1]}"))
                        report["tasks_completed"].append("Interaction feature created")
                elif task_id == 7:
                    num_cols = df.select(pl.col(pl.Float64, pl.Int64)).columns
                    for col in num_cols: df = df.with_columns(pl.col(col).pow(2).alias(f"{col}_sq"))
                    report["tasks_completed"].append("Polynomial features generated")
                elif task_id == 8:
                    num_cols = df.select(pl.col(pl.Float64, pl.Int64)).columns
                    for col in num_cols:
                        if df[col].var() < 0.01: df = df.drop(col)
                    report["tasks_completed"].append("Low variance features removed")
                elif task_id == 9:
                    date_cols = df.select(pl.col(pl.Datetime)).columns
                    for col in date_cols: df = df.with_columns(pl.col(col).dt.hour().alias(f"{col}_hour"))
                    report["tasks_completed"].append("Temporal features extracted")

            csv_output = io.BytesIO()
            df.write_csv(csv_output)
            
            record = ValidationRecord.objects.create(
                user=request.user,
                filename=file.name,
                report=report
            )
            record.processed_file.save(f"validated_{file.name}", ContentFile(csv_output.getvalue()))
            
            logger.info(f"Successfully processed {file.name}. Record ID: {record.id}")
            
            return Response({
                "record_id": record.id,
                "report": report
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError:
            return Response({"error": "Invalid tasks JSON format."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Unexpected error during validation for user {request.user.id}")
            error_msg = str(e) if settings.DEBUG else "An internal error occurred during processing."
            return Response({"error": error_msg}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
