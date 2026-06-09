import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class AffiliateStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        if not user.affiliate_code:
            user.affiliate_code = str(uuid.uuid4())[:8].upper()
            user.save()
        return Response({
            'code': user.affiliate_code,
            'referral_count': user.referral_count,
            'total_rewards': user.total_rewards
        })
