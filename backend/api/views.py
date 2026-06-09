from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import ValidationRecord
from .serializers import ValidationRecordSerializer

class ValidationHistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ValidationRecordSerializer

    def get_queryset(self):
        return ValidationRecord.objects.filter(user=self.request.user).order_by('-created_at')
