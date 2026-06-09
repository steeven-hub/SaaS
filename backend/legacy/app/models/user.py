from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    profile_picture_url: Optional[str] = None
    affiliate_code: Optional[str] = None
    referral_count: int = Field(default=0)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    stripe_customer_id: Optional[str] = None
    subscription_status: Optional[str] = "inactive"
    subscription_plan: Optional[str] = None
    total_rewards: float = Field(default=0.0)

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserPublic(UserBase):
    id: int
    created_at: datetime
