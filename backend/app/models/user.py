from sqlalchemy import Column, Integer, String, Text
from app.database.base import Base

class User(Base):
    """User model for admin authentication."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    password = Column(String(200), nullable=False)
    
    # Profile Fields
    full_name = Column(String(200), nullable=True)
    email = Column(String(200), nullable=True)
    github_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    job_title = Column(String(200), nullable=True)
    biography = Column(Text, nullable=True)
