from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.settings import settings
from app.database.base import Base
from app.database.connection import engine, SessionLocal
from app.database.seed import seed_database
from app.api.api_router import api_router

import os
from fastapi.staticfiles import StaticFiles

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: startup and shutdown events."""
    # Ensure uploads directory exists
    os.makedirs("uploads", exist_ok=True)
    # Startup: create tables and seed data
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield
    # Shutdown logic can go here


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "API RESTful para portfólio de desenvolvedor Full Stack. "
        "Inclui endpoints para projetos, tecnologias e mensagens de contato."
    ),
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router with version prefix
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

# Mount static files for images uploaded locally
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/", tags=["Health"])
def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": "1.0.0",
    }
