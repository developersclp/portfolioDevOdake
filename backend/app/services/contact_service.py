from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.contact import ContactMessage
from app.schemas.contact_schema import ContactCreate


class ContactService:
    """Service layer for contact message business logic."""

    @staticmethod
    def create_message(db: Session, contact_data: ContactCreate) -> ContactMessage:
        """Create a new contact message."""
        message = ContactMessage(**contact_data.model_dump())
        db.add(message)
        db.commit()
        db.refresh(message)
        return message

    @staticmethod
    def get_all_messages(db: Session) -> List[ContactMessage]:
        """Get all contact messages."""
        return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

    @staticmethod
    def mark_as_read(db: Session, message_id: int) -> Optional[ContactMessage]:
        """Mark a contact message as read."""
        message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
        if not message:
            return None
        message.is_read = True
        db.commit()
        db.refresh(message)
        return message
