from sqlalchemy import Column, Integer, String, Text
from app.database.base import Base


class Education(Base):
    """Education/formation model."""

    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    institution = Column(String(200), nullable=False)
    course = Column(String(200), nullable=False)
    level = Column(String(100), nullable=False)  # Técnico, Graduação, Pós-Graduação, etc.
    start_date = Column(String(20), nullable=False)  # e.g. "03/2024"
    end_date = Column(String(20), nullable=True)  # null = Em andamento
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0)

    def __repr__(self):
        return f"<Education(id={self.id}, course='{self.course}')>"
