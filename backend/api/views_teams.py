from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .permissions import IsProPlan
from users.models import User, Organization

class TeamMembersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.organization:
            return Response({"detail": "User not in an organization"}, status=status.HTTP_404_NOT_FOUND)
        
        members = request.user.organization.members.values('id', 'email', 'first_name', 'last_name', 'role')
        return Response(list(members))

    def post(self, request):
        # Implementation for adding member with limit check
        if not request.user.organization:
            return Response({"detail": "User not in an organization"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Enforce Base Plan Limit (5 members)
        org = request.user.organization
        if org.subscription_plan == 'base' and org.members.count() >= 5:
            return Response({"detail": "Limit reached: Maximum 5 members for Base plan."}, status=status.HTTP_403_FORBIDDEN)
            
        email = request.data.get('email')
        # In a real app, send invite email. Here we just add user to org if exists.
        try:
            new_user = User.objects.get(email=email)
            new_user.organization = org
            new_user.save()
            return Response({"detail": "User added successfully"}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
