from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.education import Education
from app.schemas.education_schema import EducationCreate, EducationUpdate


class EducationService:
    """Service layer for education business logic."""

    @staticmethod
    def get_all(db: Session) -> List[Education]:
        """Get all education entries ordered by order."""
        return db.query(Education).order_by(Education.order.asc(), Education.id.desc()).all()

    @staticmethod
    def get_by_id(db: Session, education_id: int) -> Optional[Education]:
        """Get a single education entry by ID."""
        return db.query(Education).filter(Education.id == education_id).first()

    @staticmethod
    def create(db: Session, edu_data: EducationCreate) -> Education:
        """Create a new education entry."""
        education = Education(**edu_data.model_dump())
        db.add(education)
        db.commit()
        db.refresh(education)
        return education

    @staticmethod
    def update(db: Session, edu_id: int, edu_data: EducationUpdate) -> Optional[Education]:
        """Update an existing education entry."""
        db_edu = EducationService.get_by_id(db, edu_id)
        if not db_edu:
            return None

        update_data = edu_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_edu, key, value)

        db.commit()
        db.refresh(db_edu)
        return db_edu

    @staticmethod
    def delete(db: Session, edu_id: int) -> bool:
        """Delete an education entry by ID."""
        db_edu = EducationService.get_by_id(db, edu_id)
        if not db_edu:
            return False

        db.delete(db_edu)
        db.commit()
        return True
