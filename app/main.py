from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.api.v1.users import router as users_router
from app.api.v1.auth import router as auth_router
from app.db.session import get_db

app = FastAPI()

app.include_router(users_router)
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"status": "ok"}
