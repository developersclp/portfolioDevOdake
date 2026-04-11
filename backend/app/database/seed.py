from sqlalchemy.orm import Session
from app.core.settings import settings
from app.models.user import User
from app.api.routes.auth import hash_password, verify_password

def seed_database(db: Session) -> None:
    """Populate database with initial data from environment settings."""

    # --- Admin User / Profile ---
    admin_user = db.query(User).filter(User.username == settings.ADMIN_USERNAME).first()
    
    if not admin_user:
        print(f"[SEED] Creating admin user: {settings.ADMIN_USERNAME}")
        admin_user = User(
            username=settings.ADMIN_USERNAME,
            password=hash_password(settings.ADMIN_PASSWORD),
            full_name=settings.ADMIN_FULL_NAME,
            email=settings.ADMIN_EMAIL,
            github_url=settings.ADMIN_GITHUB,
            linkedin_url=settings.ADMIN_LINKEDIN,
            job_title=settings.ADMIN_JOB_TITLE,
            biography=settings.ADMIN_BIO,
        )
        db.add(admin_user)
    else:
        # Update profile fields from .env (but only re-hash password if it changed)
        if not verify_password(settings.ADMIN_PASSWORD, admin_user.password):
            admin_user.password = hash_password(settings.ADMIN_PASSWORD)
        admin_user.full_name = settings.ADMIN_FULL_NAME
        admin_user.email = settings.ADMIN_EMAIL
        admin_user.github_url = settings.ADMIN_GITHUB
        admin_user.linkedin_url = settings.ADMIN_LINKEDIN
    
    db.commit()

    print("[OK] Admin profile ensured.")


