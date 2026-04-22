from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
import shutil
import os
import uuid
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.connection import get_db
from app.schemas.certificate_schema import CertificateCreate, CertificateUpdate, CertificateResponse
from app.services.certificate_service import CertificateService
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/certificates", tags=["Certificates"])


@router.get("/", response_model=List[CertificateResponse])
def list_certificates(db: Session = Depends(get_db)):
    """List all certificates."""
    return CertificateService.get_all(db)


@router.post("/", response_model=CertificateResponse, status_code=201, dependencies=[Depends(get_current_admin)])
def create_certificate(
    name: str = Form(...),
    issuer: str = Form(...),
    date: Optional[str] = Form(None),
    link: Optional[str] = Form(None),
    order: int = Form(0),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """Create a new certificate with optional image upload."""
    image_url = None
    if image:
        file_ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_ext}"
        filepath = os.path.join("uploads", filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_url = f"/uploads/{filename}"

    cert_data = CertificateCreate(
        name=name,
        issuer=issuer,
        date=date,
        link=link,
        image_url=image_url,
        order=order
    )
    return CertificateService.create(db, cert_data)


@router.put("/{cert_id}", response_model=CertificateResponse, dependencies=[Depends(get_current_admin)])
def update_certificate(cert_id: int, cert_data: CertificateUpdate, db: Session = Depends(get_db)):
    """Update an existing certificate."""
    certificate = CertificateService.update(db, cert_id, cert_data)
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificado não encontrado")
    return certificate


@router.delete("/{cert_id}", status_code=204, dependencies=[Depends(get_current_admin)])
def delete_certificate(cert_id: int, db: Session = Depends(get_db)):
    """Delete a certificate by ID."""
    success = CertificateService.delete(db, cert_id)
    if not success:
        raise HTTPException(status_code=404, detail="Certificado não encontrado")
    return None
