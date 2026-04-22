from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.certificate import Certificate
from app.schemas.certificate_schema import CertificateCreate, CertificateUpdate


class CertificateService:
    """Service layer for certificate business logic."""

    @staticmethod
    def get_all(db: Session) -> List[Certificate]:
        """Get all certificates ordered by order."""
        return db.query(Certificate).order_by(Certificate.order.asc(), Certificate.id.desc()).all()

    @staticmethod
    def get_by_id(db: Session, certificate_id: int) -> Optional[Certificate]:
        """Get a single certificate by ID."""
        return db.query(Certificate).filter(Certificate.id == certificate_id).first()

    @staticmethod
    def create(db: Session, cert_data: CertificateCreate) -> Certificate:
        """Create a new certificate."""
        certificate = Certificate(**cert_data.model_dump())
        db.add(certificate)
        db.commit()
        db.refresh(certificate)
        return certificate

    @staticmethod
    def update(db: Session, cert_id: int, cert_data: CertificateUpdate) -> Optional[Certificate]:
        """Update an existing certificate."""
        db_cert = CertificateService.get_by_id(db, cert_id)
        if not db_cert:
            return None

        update_data = cert_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_cert, key, value)

        db.commit()
        db.refresh(db_cert)
        return db_cert

    @staticmethod
    def delete(db: Session, cert_id: int) -> bool:
        """Delete a certificate by ID."""
        db_cert = CertificateService.get_by_id(db, cert_id)
        if not db_cert:
            return False

        db.delete(db_cert)
        db.commit()
        return True
