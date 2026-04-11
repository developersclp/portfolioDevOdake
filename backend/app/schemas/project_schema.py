from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class TechnologyInProject(BaseModel):
    """Nested technology representation within a project."""
    id: int
    name: str
    image_url: Optional[str] = None
    category: str

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    """Base schema for project data."""
    title: str = Field(..., min_length=1, max_length=200, examples=["E-commerce Platform"])
    description: str = Field(..., min_length=1, examples=["A full-featured e-commerce platform..."])
    short_description: Optional[str] = Field(None, max_length=300)
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    """Schema for creating a new project."""
    technology_ids: List[int] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    """Schema for updating an existing project (all fields optional)."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    short_description: Optional[str] = Field(None, max_length=300)
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    featured: Optional[bool] = None
    order: Optional[int] = None
    technology_ids: Optional[List[int]] = None


class ProjectImageResponse(BaseModel):
    id: int
    image_url: str
    is_main: bool

    class Config:
        from_attributes = True

class ProjectResponse(ProjectBase):
    """Schema for project API responses."""
    id: int
    technologies: List[TechnologyInProject] = []
    images: List[ProjectImageResponse] = []

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
