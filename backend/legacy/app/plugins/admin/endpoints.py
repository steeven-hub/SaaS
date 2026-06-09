from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from app.api.endpoints.deps import get_active_user
from app.models.user import User
from app.core.database import get_session

router = APIRouter()

def is_superuser(current_user: User = Depends(get_active_user)):
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Accès administrateur requis."
        )
    return current_user

@router.get("/kpis", dependencies=[Depends(is_superuser)])
async def get_kpis(session: Session = Depends(get_session)):
    # Total Users
    total_users = session.exec(select(func.count(User.id))).one()
    
    # Active Users
    active_users = session.exec(select(func.count(User.id)).where(User.subscription_status == 'active')).one()
    
    # Total Rewards Distributed
    total_rewards = session.exec(select(func.sum(User.total_rewards))).one() or 0.0
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_rewards_distributed": total_rewards
    }
