from pydantic import BaseModel, Field
from typing import Optional


class TechnologyBase(BaseModel):
    """Base schema for technology data."""
    name: str = Field(..., min_length=1, max_length=100, examples=["React"])
    image_url: Optional[str] = Field(None, examples=["/uploads/react-icon.png"])
    category: str = Field(..., examples=["frontend"])
    order: int = 0


class TechnologyCreate(TechnologyBase):
    """Schema for creating a new technology."""
    pass


class TechnologyUpdate(BaseModel):
    """Schema for updating a technology."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    image_url: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None


class TechnologyResponse(TechnologyBase):
    """Schema for technology API responses."""
    id: int

    class Config:
        from_attributes = True
