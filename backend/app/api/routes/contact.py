from fastapi import APIRouter, Depends, HTTPException
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
    """List all contact messages."""
    return ContactService.get_all_messages(db)


@router.patch("/{message_id}/read", response_model=ContactResponse, dependencies=[Depends(get_current_admin)])
def mark_message_as_read(message_id: int, db: Session = Depends(get_db)):
    """Mark a contact message as read."""
    message = ContactService.mark_as_read(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    return message
