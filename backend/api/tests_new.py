from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import User
import io
import json
import polars as pl

class SubmissionValidatorTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password')
        self.client.force_authenticate(user=self.user)
        self.url = reverse('validate_submission')
        
    def test_validator_processing(self):
        # Create a CSV with a duplicate and a null
        csv_content = "id,value\n1,10\n1,10\n2,\n"
        file = io.BytesIO(csv_content.encode('utf-8'))
        file.name = 'test.csv'
        
        # Define tasks: 1 (impute nulls), 2 (remove duplicates)
        tasks = [
            {'id': 1, 'completed': True},
            {'id': 2, 'completed': True}
        ]
        
        response = self.client.post(self.url, {
            'file': file,
            'tasks': json.dumps(tasks)
        }, format='multipart')
        
        self.assertEqual(response.status_code, 200)
        # Should return JSON with record_id and report
        self.assertIn('application/json', response['Content-Type'])
        data = response.json()
        self.assertIn('record_id', data)
        self.assertIn('report', data)
        self.assertTrue(len(data['report']['tasks_completed']) > 0)
