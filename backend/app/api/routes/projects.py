from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import os
import uuid

from app.database.connection import get_db
from app.schemas.project_schema import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import ProjectService
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=List[ProjectResponse])
def list_projects(
    featured: Optional[bool] = Query(None, description="Filter by featured status"),
    db: Session = Depends(get_db),
):
    """List all projects. Optionally filter by featured status."""
    return ProjectService.get_all(db, featured=featured)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a single project by ID."""
    project = ProjectService.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project


@router.post("/", response_model=ProjectResponse, status_code=201, dependencies=[Depends(get_current_admin)])
def create_project(project_data: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project."""
    return ProjectService.create(db, project_data)


@router.put("/{project_id}", response_model=ProjectResponse, dependencies=[Depends(get_current_admin)])
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
):
    """Update an existing project."""
    project = ProjectService.update(db, project_id, project_data)
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project


@router.delete("/{project_id}", status_code=204, dependencies=[Depends(get_current_admin)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete a project by ID."""
    success = ProjectService.delete(db, project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return None


@router.post("/{project_id}/images", status_code=201, dependencies=[Depends(get_current_admin)])
def upload_project_image(
    project_id: int,
    file: UploadFile = File(...),
    is_main: bool = Form(False),
    db: Session = Depends(get_db)
):
    """Upload an image to a project."""
    project = ProjectService.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    file_ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    filepath = os.path.join("uploads", filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    image_url = f"/uploads/{filename}"
    ProjectService.add_image(db, project_id, image_url, is_main)
    return {"message": "Image uploaded successfully", "image_url": image_url}

@router.delete("/images/{image_id}", status_code=204, dependencies=[Depends(get_current_admin)])
def delete_project_image(image_id: int, db: Session = Depends(get_db)):
    """Delete a project image."""
    success = ProjectService.delete_image(db, image_id)
    if not success:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
    return None
