from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.contact_schema import ContactCreate, ContactResponse, ContactMessageSent
from app.services.contact_service import ContactService
from app.api.routes.auth import get_current_admin

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("/", response_model=ContactMessageSent, status_code=201)
def send_message(contact_data: ContactCreate, db: Session = Depends(get_db)):
    """Send a contact message."""
    message = ContactService.create_message(db, contact_data)
    return ContactMessageSent(message="Mensagem enviada com sucesso!", id=message.id)


@router.get("/", response_model=List[ContactResponse], dependencies=[Depends(get_current_admin)])
def list_messages(db: Session = Depends(get_db)):
    """List all contact messages. (Prepared for future authentication)"""
    # TODO: Add authentication middleware before production
    return ContactService.get_all_messages(db)
