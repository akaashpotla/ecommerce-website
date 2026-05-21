from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.oauth2 import get_current_user
from app.db.session import get_db
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.schemas import CartCreate, CartResponse

router = APIRouter(prefix="/api/v1", tags=["cart"])

@router.post("/cart", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def add_to_cart(payload: CartCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == payload.product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found!")
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
   
    if cart is None:
        cart = Cart(user_id=current_user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    cart_item = db.query(CartItem).filter(CartItem.cart_id == cart.id, CartItem.product_id == payload.product_id).first()

    if cart_item:
        cart_item.quantity += payload.quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=payload.product_id, quantity=payload.quantity)
        db.add(cart_item)
    
    db.commit()
    db.refresh(cart)
    return cart

@router.get("/cart", response_model=CartResponse, status_code=status.HTTP_200_OK)
def get_cart(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found!")
    return cart

@router.delete("/cart/{cart_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_cart(cart_item_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")

    cart_item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.cart_id == cart.id
    ).first()
    if cart_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()