from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
import logging

logger = logging.getLogger(__name__)

class LicensesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            org = user.organization
            # Safely handle missing organization
            plan = org.subscription_plan if org else 'base'
            status = 'Actif' if org and org.subscription_status == 'active' else 'Inactif'
            org_id = org.id if org else 0
            
            plan_display = str(plan).capitalize()
            users_limit = '5' if plan == 'base' else 'Illimité'
            
            return Response([
                {
                    'id': f'LIC-{org_id:04d}', 
                    'product': f'Plan {plan_display}', 
                    'status': status, 
                    'expires': '2027-06-07', 
                    'users': f'1/{users_limit}'
                },
            ])
        except Exception as e:
            logger.exception("Error in LicensesView")
            return Response({"error": "Failed to fetch licenses"}, status=500)

class InvoicesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            org = user.organization
            plan = org.subscription_plan if org else 'base'
            org_id = org.id if org else 0
            
            amount = '29.00 $' if plan == 'base' else '99.00 $'
            if plan == 'enterprise':
                amount = 'Sur mesure'

            return Response([
                {'id': f'INV-2026-{org_id:02d}', 'date': '2026-06-07', 'amount': amount, 'status': 'Payé'},
            ])
        except Exception as e:
            logger.exception("Error in InvoicesView")
            return Response({"error": "Failed to fetch invoices"}, status=500)

class DownloadsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response([
            {'name': 'SaaS-Data-Engine SDK v1.0.0', 'type': 'Librairie', 'size': '12.5 MB', 'date': '2026-06-07'},
            {'name': 'Guide de configuration API', 'type': 'Documentation', 'size': '2.1 MB', 'date': '2026-06-07'},
        ])
