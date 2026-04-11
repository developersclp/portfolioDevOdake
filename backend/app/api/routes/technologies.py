from fastapi import APIRouter, Depends, Query, File, UploadFile, Form, HTTPException
import shutil
import os
import uuid
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.connection import get_db
from app.schemas.technology_schema import TechnologyCreate, TechnologyUpdate, TechnologyResponse
from app.services.technology_service import TechnologyService
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/technologies", tags=["Technologies"])


@router.get("/", response_model=List[TechnologyResponse])
def list_technologies(
    category: Optional[str] = Query(None, description="Filter by category (frontend, backend, database, devops)"),
    db: Session = Depends(get_db),
):
    """List all technologies. Optionally filter by category."""
    return TechnologyService.get_all(db, category=category)


@router.post("/", response_model=TechnologyResponse, status_code=201, dependencies=[Depends(get_current_admin)])
def create_technology(
    name: str = Form(...),
    category: str = Form(...),
    order: int = Form(0),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Create a new technology with an uploaded image."""
    file_ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    filepath = os.path.join("uploads", filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    image_url = f"/uploads/{filename}"
    
    tech_data = TechnologyCreate(
        name=name,
        category=category,
        order=order,
        image_url=image_url
    )
    return TechnologyService.create(db, tech_data)

@router.put("/{tech_id}", response_model=TechnologyResponse, dependencies=[Depends(get_current_admin)])
def update_technology(
    tech_id: int,
    tech_data: TechnologyUpdate,
    db: Session = Depends(get_db),
):
    """Update an existing technology."""
    technology = TechnologyService.update(db, tech_id, tech_data)
    if not technology:
        raise HTTPException(status_code=404, detail="Tecnologia não encontrada")
    return technology

@router.delete("/{tech_id}", status_code=204, dependencies=[Depends(get_current_admin)])
def delete_technology(tech_id: int, db: Session = Depends(get_db)):
    """Delete a technology by ID."""
    success = TechnologyService.delete(db, tech_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tecnologia não encontrada")
    return None
