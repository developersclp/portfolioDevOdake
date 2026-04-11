from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Table, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from app.database.base import Base

# Association table for many-to-many: Project <-> Technology
project_technologies = Table(
    "project_technologies",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column("technology_id", Integer, ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True),
)


class Project(Base):
    """Portfolio project model."""

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    short_description = Column(String(300), nullable=True)
    image_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    demo_url = Column(String(500), nullable=True)
    featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    technologies = relationship(
        "Technology",
        secondary=project_technologies,
        back_populates="projects",
        lazy="selectin",
    )
    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan", lazy="selectin")

    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}')>"
