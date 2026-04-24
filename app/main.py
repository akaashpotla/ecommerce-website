from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}
