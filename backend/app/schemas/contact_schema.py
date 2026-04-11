from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class ContactBase(BaseModel):
    """Base schema for contact message."""
    name: str = Field(..., min_length=1, max_length=200, examples=["John Doe"])
    email: EmailStr = Field(..., examples=["john@example.com"])
    message: str = Field(..., min_length=10, examples=["Hello, I'd like to discuss a project..."])


class ContactCreate(ContactBase):
    """Schema for creating a contact message."""
    pass


class ContactResponse(ContactBase):
    """Schema for contact message API responses."""
    id: int
    is_read: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class ContactMessageSent(BaseModel):
    """Response after successfully sending a contact message."""
    message: str = "Mensagem enviada com sucesso!"
    id: int
