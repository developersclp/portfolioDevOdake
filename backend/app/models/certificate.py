from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Certificate(Base):
    """Certificate model."""

    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(300), nullable=False)
    issuer = Column(String(200), nullable=False)  # e.g. "AWS", "Google"
    date = Column(String(20), nullable=True)  # e.g. "Fev 2026"
    link = Column(String(500), nullable=True)
    image_url = Column(String(500), nullable=True)  # Path to uploaded image
    order = Column(Integer, default=0)

    def __repr__(self):
        return f"<Certificate(id={self.id}, name='{self.name}')>"
