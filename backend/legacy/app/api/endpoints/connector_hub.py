from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Any
from app.api.endpoints.deps import get_active_user
from app.models.user import User

# Connectors
from pymongo import MongoClient
import boto3
import pyodbc

router = APIRouter()

class ConnectionParams(BaseModel):
    source_type: str # 'mongodb', 's3', 'googlesheets', 'mssql'
    params: dict[str, Any]

class ConnectorFactory:
    @staticmethod
    def get_connector(conn: ConnectionParams):
        if conn.source_type == 'mongodb':
            return MongoClient(conn.params['uri'])
        elif conn.source_type == 's3':
            return boto3.client('s3', **conn.params)
        elif conn.source_type == 'mssql':
            return pyodbc.connect(conn.params['connection_string'])
        else:
            raise ValueError("Unsupported source type")

@router.post("/connect")
async def connect_source(conn: ConnectionParams, current_user: User = Depends(get_active_user)):
    try:
        connector = ConnectorFactory.get_connector(conn)
        # Verify connection (simplified)
        if conn.source_type == 'mongodb':
            connector.admin.command('ping')
        return {"status": "connected"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Connection failed: {str(e)}")
