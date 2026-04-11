from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database.base import Base

class ProjectImage(Base):
    __tablename__ = "project_images"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    is_main = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    project = relationship("Project", back_populates="images")

    def __repr__(self):
        return f"<ProjectImage(id={self.id}, project_id={self.project_id}, is_main={self.is_main})>"
