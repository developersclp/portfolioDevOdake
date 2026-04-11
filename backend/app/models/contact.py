from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime, timezone

from app.database.base import Base


class ContactMessage(Base):
    """Contact form message model."""

    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    email = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<ContactMessage(id={self.id}, name='{self.name}')>"
