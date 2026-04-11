from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.project import Project
from app.models.technology import Technology
from app.schemas.project_schema import ProjectCreate, ProjectUpdate


class ProjectService:
    """Service layer for project business logic."""

    @staticmethod
    def get_all(db: Session, featured: Optional[bool] = None) -> List[Project]:
        """Get all projects, optionally filtered by featured status."""
        query = db.query(Project)
        if featured is not None:
            query = query.filter(Project.featured == featured)
        return query.order_by(Project.order.asc(), Project.created_at.desc()).all()

    @staticmethod
    def get_by_id(db: Session, project_id: int) -> Optional[Project]:
        """Get a single project by ID."""
        return db.query(Project).filter(Project.id == project_id).first()

    @staticmethod
    def create(db: Session, project_data: ProjectCreate) -> Project:
        """Create a new project."""
        # Extract technology IDs before creating the project
        tech_ids = project_data.technology_ids
        project_dict = project_data.model_dump(exclude={"technology_ids"})

        project = Project(**project_dict)

        # Attach technologies
        if tech_ids:
            technologies = db.query(Technology).filter(Technology.id.in_(tech_ids)).all()
            project.technologies = technologies

        db.add(project)
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def update(db: Session, project_id: int, project_data: ProjectUpdate) -> Optional[Project]:
        """Update an existing project."""
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return None

        update_data = project_data.model_dump(exclude_unset=True)
        tech_ids = update_data.pop("technology_ids", None)

        for field, value in update_data.items():
            setattr(project, field, value)

        if tech_ids is not None:
            technologies = db.query(Technology).filter(Technology.id.in_(tech_ids)).all()
            project.technologies = technologies

        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def delete(db: Session, project_id: int) -> bool:
        """Delete a project by ID."""
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return False

        db.delete(project)
        db.commit()
        return True

    @staticmethod
    def add_image(db: Session, project_id: int, image_url: str, is_main: bool = False) -> bool:
        from app.models.project_image import ProjectImage
        
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return False

        # If it's a main image, update the project.image_url strictly as a cache/shortcut
        if is_main:
            project.image_url = image_url
            # and unset any previously main images for this project
            db.query(ProjectImage).filter(ProjectImage.project_id == project_id).update({"is_main": False})

        new_image = ProjectImage(project_id=project_id, image_url=image_url, is_main=is_main)
        db.add(new_image)
        db.commit()
        return True

    @staticmethod
    def delete_image(db: Session, image_id: int) -> bool:
        from app.models.project_image import ProjectImage
        image = db.query(ProjectImage).filter(ProjectImage.id == image_id).first()
        if not image:
            return False
            
        db.delete(image)
        db.commit()
        return True

