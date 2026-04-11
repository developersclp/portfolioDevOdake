from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.user import User
from app.schemas.user_schema import UserResponse, UserUpdate
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def get_user_me(db: Session = Depends(get_db)):
    """Get current admin profile (publicly accessible)."""
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.put("/me", response_model=UserResponse, dependencies=[Depends(get_current_admin)])
def update_user_me(user_data: UserUpdate, db: Session = Depends(get_db)):
    """Update current admin profile (protected)."""
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    update_data = user_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
        
    db.commit()
    db.refresh(user)
    return user
