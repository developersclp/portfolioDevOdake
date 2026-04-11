from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    job_title: Optional[str] = None
    biography: Optional[str] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    job_title: Optional[str] = None
    biography: Optional[str] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
