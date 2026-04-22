from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.education_schema import EducationCreate, EducationUpdate, EducationResponse
from app.services.education_service import EducationService
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/education", tags=["Education"])


@router.get("/", response_model=List[EducationResponse])
def list_education(db: Session = Depends(get_db)):
    """List all education entries."""
    return EducationService.get_all(db)


@router.post("/", response_model=EducationResponse, status_code=201, dependencies=[Depends(get_current_admin)])
def create_education(edu_data: EducationCreate, db: Session = Depends(get_db)):
    """Create a new education entry."""
    return EducationService.create(db, edu_data)


@router.put("/{edu_id}", response_model=EducationResponse, dependencies=[Depends(get_current_admin)])
def update_education(edu_id: int, edu_data: EducationUpdate, db: Session = Depends(get_db)):
    """Update an existing education entry."""
    education = EducationService.update(db, edu_id, edu_data)
    if not education:
        raise HTTPException(status_code=404, detail="Formação não encontrada")
    return education


@router.delete("/{edu_id}", status_code=204, dependencies=[Depends(get_current_admin)])
def delete_education(edu_id: int, db: Session = Depends(get_db)):
    """Delete an education entry by ID."""
    success = EducationService.delete(db, edu_id)
    if not success:
        raise HTTPException(status_code=404, detail="Formação não encontrada")
    return None
