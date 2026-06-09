from rest_framework import serializers
from .models import ValidationRecord

class ValidationRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValidationRecord
        fields = ['id', 'filename', 'processed_file', 'created_at', 'report']
