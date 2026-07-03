from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from users.models import User
from django.db.models import Count
import logging

logger = logging.getLogger(__name__)

class DashboardDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        # Données simplifiées pour la démo
        users = User.objects.all()
        plans_dist = users.values('subscription_plan').annotate(count=Count('id'))
        
        return Response({
            "kpis": {
                "total_users": users.count(),
                "active_users": users.filter(subscription_status='active').count(),
                "total_rewards": 5420.0 # Exemple statique
            },
            "chart_data": [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 70, 88, 62, 78],
            "plans_dist": [
                {"label": p['subscription_plan'] or 'None', "value": p['count']} for p in plans_dist
            ],
            "recent_customers": [
                {"id": u.id, "name": u.username, "email": u.email, "plan": u.subscription_plan or 'N/A', "status": u.subscription_status or 'inactive', "mrr": '$0'}
                for u in users[:5]
            ]
        })

class LicensesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            org = getattr(user, 'organization', None)
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
        except Exception:
            logger.exception("Error in LicensesView")
            return Response({"error": "Failed to fetch licenses"}, status=500)

class InvoicesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            org = getattr(user, 'organization', None)
            plan = org.subscription_plan if org else 'base'
            org_id = org.id if org else 0
            
            amount = '29.00 $' if plan == 'base' else '99.00 $'
            if plan == 'enterprise':
                amount = 'Sur mesure'

            return Response([
                {'id': f'INV-2026-{org_id:02d}', 'date': '2026-06-07', 'amount': amount, 'status': 'Payé'},
            ])
        except Exception:
            logger.exception("Error in InvoicesView")
            return Response({"error": "Failed to fetch invoices"}, status=500)

class DownloadsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response([
            {'name': 'SaaS-Data-Engine SDK v1.0.0', 'type': 'Librairie', 'size': '12.5 MB', 'date': '2026-06-07'},
            {'name': 'Guide de configuration API', 'type': 'Documentation', 'size': '2.1 MB', 'date': '2026-06-07'},
        ])
