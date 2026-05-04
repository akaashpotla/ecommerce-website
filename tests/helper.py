from app.core.hashing import get_password_hash
from app.models.cart import Cart, CartItem
from app.models.order import Order
from app.models.product import Product
from app.models.user import User

AUTH_URL = "/api/v1/user/auth"

NAME = "Akaash Potla"
EMAIL = "akaash@gmail.com"
PASSWORD = "1Password!"

def create_user(db_session):
    user = User(
        name=NAME,
        email=EMAIL,
        password=get_password_hash(PASSWORD)
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

def create_product(db_session, name="Test Product", description="A product", price=5.99):
    product = Product(name=name, description=description, price=price)
    db_session.add(product)
    db_session.commit()
    db_session.refresh(product)
    return product

def create_cart(db_session, user):
    cart = Cart(user_id=user.id)
    db_session.add(cart)
    db_session.commit()
    db_session.refresh(cart)
    return cart

def create_cart_item(db_session, cart, product, quantity=1):
    cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=quantity)
    db_session.add(cart_item)
    db_session.commit()
    db_session.refresh(cart_item)
    return cart_item

def create_order(db_session, user, cart, total=9.99, quantity=1):
    order = Order(user_id=user.id, cart_id=cart.id, total=total, quantity=quantity)
    db_session.add(order)
    db_session.commit()
    db_session.refresh(order)
    return order