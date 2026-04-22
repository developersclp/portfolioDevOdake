from pydantic import BaseModel, Field
from typing import Optional


class EducationBase(BaseModel):
    """Base schema for education data."""
    institution: str = Field(..., min_length=1, max_length=200, examples=["Senai"])
    course: str = Field(..., min_length=1, max_length=200, examples=["Análise e Desenvolvimento de Sistemas"])
    level: str = Field(..., min_length=1, max_length=100, examples=["Técnico"])
    start_date: str = Field(..., min_length=1, max_length=20, examples=["03/2024"])
    end_date: Optional[str] = Field(None, max_length=20, examples=["12/2025"])
    description: Optional[str] = Field(None)
    order: int = 0


class EducationCreate(EducationBase):
    """Schema for creating a new education entry."""
    pass


class EducationUpdate(BaseModel):
    """Schema for updating an education entry."""
    institution: Optional[str] = Field(None, min_length=1, max_length=200)
    course: Optional[str] = Field(None, min_length=1, max_length=200)
    level: Optional[str] = Field(None, min_length=1, max_length=100)
    start_date: Optional[str] = Field(None, min_length=1, max_length=20)
    end_date: Optional[str] = Field(None, max_length=20)
    description: Optional[str] = None
    order: Optional[int] = None


class EducationResponse(EducationBase):
    """Schema for education API responses."""
    id: int

    class Config:
        from_attributes = True
