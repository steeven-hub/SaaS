from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from pymongo import MongoClient
import boto3
import pyodbc

class ConnectorFactory:
    @staticmethod
    def get_connector(source_type, params):
        if source_type == 'mongodb':
            return MongoClient(params['uri'])
        elif source_type == 's3':
            return boto3.client('s3', **params)
        elif source_type == 'mssql':
            return pyodbc.connect(params['connection_string'])
        else:
            raise ValueError("Unsupported source type")

class ConnectSourceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        source_type = request.data.get('source_type')
        params = request.data.get('params', {})
        
        try:
            connector = ConnectorFactory.get_connector(source_type, params)
            if source_type == 'mongodb':
                connector.admin.command('ping')
            return Response({"status": "connected"})
        except Exception as e:
            return Response({"detail": f"Connection failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
