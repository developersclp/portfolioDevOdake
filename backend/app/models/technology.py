from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.base import Base
from app.models.project import project_technologies


class Technology(Base):
    """Technology/skill model."""

    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True, index=True)
    image_url = Column(String(255), nullable=True)  # Path to uploaded image
    category = Column(String(50), nullable=False)  # frontend, backend, database, devops
    order = Column(Integer, default=0)

    # Relationships
    projects = relationship(
        "Project",
        secondary=project_technologies,
        back_populates="technologies",
        lazy="selectin",
    )

    def __repr__(self):
        return f"<Technology(id={self.id}, name='{self.name}')>"
