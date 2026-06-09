import polars as pl
import pandas as pd
import io
import xlsxwriter
import os
from fpdf import FPDF
from openai import OpenAI

class DataEngine:
    @staticmethod
    def get_llm_insights(summary_text: str) -> str:
        try:
            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": f"Analyze this data schema and provide 3 key business insights: {summary_text}"}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Could not generate AI insight: {str(e)}"

    @staticmethod
    def generate_pdf_report(insights: list) -> bytes:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", 'B', 16)
        pdf.cell(200, 10, txt="Executive Data Report", ln=True, align='C')
        pdf.set_font("Arial", size=12)
        pdf.ln(10)
        for insight in insights:
            pdf.multi_cell(0, 10, txt=f"- {insight}")
        return pdf.output(dest='S')

    @staticmethod
    def process_data(file_content: bytes, filename: str):
        # 1. Universal Ingestion
        if filename.endswith('.csv'):
            df = pl.read_csv(io.BytesIO(file_content))
        elif filename.endswith(('.xls', '.xlsx')):
            df = pl.read_excel(io.BytesIO(file_content))
        elif filename.endswith('.json'):
            df = pl.read_json(io.BytesIO(file_content))
        elif filename.endswith('.parquet'):
            df = pl.read_parquet(io.BytesIO(file_content))
        else:
            raise ValueError(f"Unsupported file format: {filename}")

        # Data Validation Rules
        errors = []
        if df.is_empty():
            errors.append("Error: The uploaded file is empty.")

        # Data Profiling & Insights
        # Safely count nulls
        missing_count = 0
        for col in df.columns:
            missing_count += df[col].null_count()
            
        insights = [
            f"Total Rows: {len(df)}",
            f"Missing Values: {missing_count}",
            "Action: Ensure data completeness before final analysis."
        ]
        
        # AI Insight
        insights.append(DataEngine.get_llm_insights(str(df.schema)))

        # Basic Cleaning
        df = df.unique()
        
        # Fill nulls with safe casting per column
        for col in df.columns:
            if df[col].dtype in [pl.Int64, pl.Float64]:
                df = df.with_columns(pl.col(col).fill_null(0))
            else:
                df = df.with_columns(pl.col(col).fill_null(""))

        # Detailed Profiling & Distribution for Charting
        profiling_data = []
        chart_data_list = []
        for col in df.columns:
            null_count = df[col].null_count()
            unique_count = df[col].n_unique()
            dtype = str(df[col].dtype)
            
            profiling_data.append({
                "Metric": col,
                "Value": f"Type: {dtype} | Nulls: {null_count} | Unique: {unique_count}"
            })
            
            # Value Counts for Charting (Top 10)
            counts = df[col].value_counts().sort("count", descending=True).head(10)
            for row in counts.to_dicts():
                chart_data_list.append({
                    "Column": col,
                    "Label": str(row[col]),
                    "Count": row["count"]
                })

        # Generate Excel
        excel_output = io.BytesIO()
        with pd.ExcelWriter(excel_output, engine='xlsxwriter') as writer:
            df.to_pandas().to_excel(writer, sheet_name='Cleaned Data', index=False)
            
            # Decision Hub
            insights_df = pd.DataFrame(insights, columns=['Decision Metrics'])
            insights_df.to_excel(writer, sheet_name='Decision Hub', index=False)
            
            # Profiling Report
            profiling_df = pd.DataFrame(profiling_data)
            profiling_df.to_excel(writer, sheet_name='Profiling Report', index=False)
            
            # Chart Data
            chart_df = pd.DataFrame(chart_data_list)
            chart_df.to_excel(writer, sheet_name='Chart Data', index=False)
            
            # Formatting
            workbook = writer.book
            worksheet = writer.sheets['Decision Hub']
            alert_format = workbook.add_format({'bg_color': '#FFC7CE', 'font_color': '#9C0006'})
            worksheet.conditional_format('A1:A10', {'type': 'text', 'criteria': 'containing', 'value': 'Action', 'format': alert_format})

        excel_output.seek(0)
        return excel_output, insights
