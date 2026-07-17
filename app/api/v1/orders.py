from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.oauth2 import get_current_user
from app.db.session import get_db
from app.models.cart import Cart
from app.models.order import Order
from app.schemas import OrderResponse, OrderListResponse

router = APIRouter(prefix="/api/v1", tags=["orders"])

@router.post("/order", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    total = sum(item.product.price * item.quantity for item in cart.cart_items)
    order = Order(user_id=current_user.id, cart_id=cart.id, total=total)
    
    db.add(order)

    for item in cart.cart_items:
        db.delete(item)

    db.commit()
    db.refresh(order)
    return order

@router.get("/order", response_model=OrderListResponse, status_code=status.HTTP_200_OK)
def get_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    orders = db.query(Order).filter(Order.user_id == current_user.id).all()
    return {"orders": orders}