from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session, select
from app.core.database import get_session
from app.core.security import SECRET_KEY, ALGORITHM
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as e:
        print(f"DEBUG: JWT Error: {e}")
        print(f"DEBUG: Token: {token}")
        print(f"DEBUG: Key: {SECRET_KEY}")
        raise credentials_exception
        
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if user is None:
        raise credentials_exception
    return user

async def get_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def verify_plan_access(required_plan: str):
    def permission_dependency(current_user: User = Depends(get_active_user)):
        if current_user.subscription_plan == "hybrid":
            return current_user
        if current_user.subscription_plan != required_plan:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail=f"Abonnement '{required_plan}' requis."
            )
        return current_user
    return permission_dependency
