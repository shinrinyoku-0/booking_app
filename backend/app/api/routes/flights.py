from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from app.api.deps import SessionDep
from app.models import Flight, Ticket
from pydantic import BaseModel
from uuid import UUID

router = APIRouter()

class TicketCreate(BaseModel):
    customer_id: UUID
    flight_id: str
    price: float

@router.get("/search")
def search_flights(
    origin: str,
    destination: str,
    session: SessionDep
):
    query = select(Flight).where(
        Flight.origin == origin,
        Flight.destination == destination
    )
    flights = session.exec(query).all()
    return flights

@router.post("/book")
def book_ticket(
    ticket_data: TicketCreate,
    session: SessionDep
):
    # Check if the flight exists
    flight = session.get(Flight, ticket_data.flight_id)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    
    # Create the ticket
    new_ticket = Ticket(
        customer_id=ticket_data.customer_id,
        flight_id=ticket_data.flight_id,
        price=ticket_data.price
    )
    session.add(new_ticket)
    session.commit()
    session.refresh(new_ticket)
    
    return {"message": "Ticket booked successfully", "ticket_id": new_ticket.id}