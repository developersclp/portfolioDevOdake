from fastapi import APIRouter

from app.api.routes.projects import router as projects_router
from app.api.routes.technologies import router as technologies_router
from app.api.routes.contact import router as contact_router
from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router

api_router = APIRouter()

api_router.include_router(projects_router)
api_router.include_router(technologies_router)
api_router.include_router(contact_router)
api_router.include_router(auth_router)
api_router.include_router(users_router)
