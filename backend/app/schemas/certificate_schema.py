from pydantic import BaseModel, Field
from typing import Optional


class CertificateBase(BaseModel):
    """Base schema for certificate data."""
    name: str = Field(..., min_length=1, max_length=300, examples=["AWS Certified Cloud Practitioner"])
    issuer: str = Field(..., min_length=1, max_length=200, examples=["AWS"])
    date: Optional[str] = Field(None, max_length=20, examples=["Fev 2026"])
    link: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = Field(None, max_length=500)
    order: int = 0


class CertificateCreate(CertificateBase):
    """Schema for creating a new certificate."""
    pass


class CertificateUpdate(BaseModel):
    """Schema for updating a certificate."""
    name: Optional[str] = Field(None, min_length=1, max_length=300)
    issuer: Optional[str] = Field(None, min_length=1, max_length=200)
    date: Optional[str] = Field(None, max_length=20)
    link: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = Field(None, max_length=500)
    order: Optional[int] = None


class CertificateResponse(CertificateBase):
    """Schema for certificate API responses."""
    id: int

    class Config:
        from_attributes = True
