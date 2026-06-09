from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count, Sum
from users.models import User

class AdminKPIsView(APIView):
    permission_classes = [permissions.IsAdminUser] # is_staff or is_superuser

    def get(self, request):
        total_users = User.objects.count()
        active_users = User.objects.filter(subscription_status='active').count()
        total_rewards = User.objects.aggregate(Sum('total_rewards'))['total_rewards__sum'] or 0.0
        
        return Response({
            "total_users": total_users,
            "active_users": active_users,
            "total_rewards_distributed": total_rewards
        })
