from django.db import models
from users.models import User

class ValidationRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    processed_file = models.FileField(upload_to='validated_files/')
    created_at = models.DateTimeField(auto_now_add=True)
    report = models.JSONField()

    def __str__(self):
        return f"{self.filename} - {self.created_at}"
