from fastapi import APIRouter, Depends
from sqlmodel import select, Session
from app.api.deps import SessionDep
from app.models import Flight

router = APIRouter()

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