from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.technology import Technology
from app.schemas.technology_schema import TechnologyCreate, TechnologyUpdate


class TechnologyService:
    """Service layer for technology business logic."""

    @staticmethod
    def get_all(db: Session, category: Optional[str] = None) -> List[Technology]:
        """Get all technologies, optionally filtered by category."""
        query = db.query(Technology)
        if category:
            query = query.filter(Technology.category == category)
        return query.order_by(Technology.order.asc(), Technology.name.asc()).all()

    @staticmethod
    def get_by_id(db: Session, technology_id: int) -> Optional[Technology]:
        """Get a single technology by ID."""
        return db.query(Technology).filter(Technology.id == technology_id).first()

    @staticmethod
    def create(db: Session, tech_data: TechnologyCreate) -> Technology:
        """Create a new technology."""
        technology = Technology(**tech_data.model_dump())
        db.add(technology)
        db.commit()
        db.refresh(technology)
        return technology

    @staticmethod
    def update(db: Session, tech_id: int, tech_data: TechnologyUpdate) -> Optional[Technology]:
        """Update an existing technology."""
        db_tech = TechnologyService.get_by_id(db, tech_id)
        if not db_tech:
            return None
        
        update_data = tech_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_tech, key, value)
            
        db.commit()
        db.refresh(db_tech)
        return db_tech

    @staticmethod
    def delete(db: Session, tech_id: int) -> bool:
        """Delete abstract Technology by ID"""
        db_tech = TechnologyService.get_by_id(db, tech_id)
        if not db_tech:
            return False
        
        db.delete(db_tech)
        db.commit()
        return True
