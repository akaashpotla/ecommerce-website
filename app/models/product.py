from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    name: Mapped[str] = mapped_column(String(255), nullable = False)
    description: Mapped[str] = mapped_column(String(500), nullable = False)
    price: Mapped[float] = mapped_column(Float, nullable = False)

    cart_items = relationship("CartItem", back_populates="product")