from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI

from app.db.session import SessionLocal, engine
from app.api.v1.users import router as users_router
from app.api.v1.auth import router as auth_router
from app.api.v1.products import router as product_router
from app.api.v1.cart import router as cart_router
from app.api.v1.orders import router as order_router
from app.db.base import Base
from app.db.session import get_db
from app.models.product import Product

def seed_products(db):
    count = db.query(Product).count()
    if count == 0:
        products = [
            Product(name="Oil Filter", description="High-performance oil filter compatible with most domestic and import vehicles", price=8.99),
            Product(name="Brake Pads", description="Ceramic front brake pads with low dust and quiet operation", price=34.99),
            Product(name="Air Filter", description="Engine air filter for improved airflow and fuel efficiency", price=12.99),
            Product(name="Spark Plugs", description="Iridium spark plugs for better ignition and fuel economy set of 4", price=24.99),
            Product(name="Alternator", description="Remanufactured alternator with 12 month warranty fits most V6 engines", price=89.99),
            Product(name="Radiator Hose", description="Upper radiator hose heat and pressure resistant silicone construction", price=18.99),
            Product(name="Serpentine Belt", description="OEM replacement serpentine belt durable rubber construction", price=22.99),
            Product(name="Headlight Bulb", description="Halogen headlight bulb H11 fits most 2010 and newer vehicles pack of 2", price=14.99),
            Product(name="Battery Terminal", description="Heavy duty battery terminal connectors corrosion resistant set of 2", price=9.99),
            Product(name="Windshield Wipers", description="All weather windshield wiper blades 20 inch driver and passenger set", price=19.99),
        ]
        db.add_all(products)
        db.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_products(db)
    finally:
        db.close()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(users_router)
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://www.parts-plus.xyz",
        "https://parts-plus.xyz"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}
