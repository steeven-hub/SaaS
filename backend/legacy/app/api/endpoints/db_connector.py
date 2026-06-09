from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from app.api.endpoints.deps import get_active_user
from app.models.user import User

router = APIRouter()

class DBConnection(BaseModel):
    db_type: str # 'postgresql' or 'mysql'
    host: str
    port: int
    user: str
    password: str
    dbname: str = "postgres"

def get_url(conn: DBConnection):
    return f"{conn.db_type}://{conn.user}:{conn.password}@{conn.host}:{conn.port}/{conn.dbname}"

@router.post("/connect")
async def connect_db(conn: DBConnection, current_user: User = Depends(get_active_user)):
    url = get_url(conn)
    try:
        engine = create_engine(url)
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "connected"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Could not connect: {str(e)}")

@router.post("/list")
async def list_dbs(conn: DBConnection, current_user: User = Depends(get_active_user)):
    # Connect to the server generally to list databases
    base_url = f"{conn.db_type}://{conn.user}:{conn.password}@{conn.host}:{conn.port}/"
    try:
        engine = create_engine(base_url)
        with engine.connect() as connection:
            if "postgresql" in conn.db_type:
                result = connection.execute(text("SELECT datname FROM pg_database WHERE datistemplate = false"))
            else:
                result = connection.execute(text("SHOW DATABASES"))
            dbs = [row[0] for row in result]
        return {"databases": dbs}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Could not list: {str(e)}")
