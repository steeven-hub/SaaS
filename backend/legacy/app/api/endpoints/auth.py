from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.core.database import get_session
from app.core.security import verify_password, get_password_hash, create_access_token, generate_referral_code
from app.models.user import User, UserPublic
from pydantic import BaseModel, EmailStr
from app.api.endpoints.deps import get_active_user

router = APIRouter()

@router.get("/me", response_model=UserPublic)
def get_me(current_user: User = Depends(get_active_user)):
    return current_user

@router.put("/me", response_model=UserPublic)
def update_me(
    user_in: UserPublic, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_active_user)
):
    current_user.first_name = user_in.first_name
    current_user.last_name = user_in.last_name
    current_user.date_of_birth = user_in.date_of_birth
    current_user.profile_picture_url = user_in.profile_picture_url
    
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    referrer_code: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=UserPublic)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    # Check if user exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already registered")
    
    # Create new user
    db_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        affiliate_code=generate_referral_code()
    )
    
    # Track referral
    if user_in.referrer_code:
        statement = select(User).where(User.affiliate_code == user_in.referrer_code)
        referrer = session.exec(statement).first()
        if referrer:
            referrer.referral_count += 1
            referrer.total_rewards += 10.0
            session.add(referrer)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
