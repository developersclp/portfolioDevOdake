from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    PROJECT_NAME: str = "Portfolio API"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"

    # Security
    SECRET_KEY: str = "super-secret-key-change-in-production"
    JWT_EXPIRATION_MINUTES: int = 1440  # 24 hours

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    # Admin Identity & Profile
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "senha123"
    ADMIN_FULL_NAME: str = "Pedro Odake"
    ADMIN_EMAIL: str = "pedro@email.com"
    ADMIN_GITHUB: str = "https://github.com/"
    ADMIN_LINKEDIN: str = "https://linkedin.com/"
    ADMIN_JOB_TITLE: str = "Desenvolvedor"
    ADMIN_BIO: str = "Sua biografia aqui."

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = True
