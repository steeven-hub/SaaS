from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse
from .data_engine import DataEngine
from .permissions import IsBasePlan, IsProPlan
import io
from urllib.parse import quote
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class FileUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsBasePlan]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"detail": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            content = file.read()
            excel_output, insights, corr_data = DataEngine.process_data(content, file.name)
            
            # If the user wants JSON (Auto-EDA)
            if request.query_params.get('format') == 'json':
                return Response({
                    "insights": insights,
                    "correlations": corr_data
                })

            filename_base = file.name.split('.')[0]
            safe_filename = quote(f"processed_{filename_base}.xlsx")
            
            response = HttpResponse(
                excel_output.getvalue(),
                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            response['Content-Disposition'] = f"attachment; filename*=UTF-8''{safe_filename}"
            return response
        except Exception as e:
            return Response({"detail": f"Error processing file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class UploadDemoView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"detail": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            content = file.read()
            excel_output, insights, corr_data = DataEngine.process_data(content, file.name)
            
            # For demo, we might want to return both the file and the insights
            # We'll stick to the file but add insights in a custom header
            filename_base = file.name.split('.')[0]
            safe_filename = quote(f"demo_processed_{filename_base}.xlsx")
            
            response = HttpResponse(
                excel_output.getvalue(),
                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            response['Content-Disposition'] = f"attachment; filename*=UTF-8''{safe_filename}"
            # Add a hint for the frontend to know insights are available
            response['X-Insights-Available'] = 'true'
            return response
        except Exception as e:
            return Response({"detail": f"Error processing demo file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AIInsightsView(APIView):
    # Relax permission for demo: allow Base plan users
    permission_classes = [permissions.IsAuthenticated, IsBasePlan]

    def post(self, request):
        try:
            data = request.data.get('data')
            insights = DataEngine.get_llm_insights(str(data))
            return Response({"insights": insights})
        except Exception as e:
            return Response({"detail": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GeneratePDFView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsProPlan]

    def post(self, request):
        insights = request.data.get('insights', [])
        filename = request.data.get('filename', 'Analysis_Report')
        pdf_bytes = DataEngine.generate_pdf_report(insights, filename)
        
        response = HttpResponse(pdf_bytes, content_type="application/pdf")
        response['Content-Disposition'] = f"attachment; filename={filename}.pdf"
        return response
