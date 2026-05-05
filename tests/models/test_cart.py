from sqlalchemy.exc import IntegrityError

import pytest
from app.models.cart import Cart, CartItem
from tests.helper import create_user, create_product, create_cart, create_cart_item

class TestCartModel:

    def test_cart_created(self, db_session):
        user = create_user(db_session)
        cart = create_cart(db_session, user)
        assert cart.id is not None
        assert cart.user_id == user.id
        assert cart.user == user
        assert cart.cart_items == []

    def test_cart_without_user_error(self, db_session):
        cart = Cart(user_id=None)
        db_session.add(cart)
        with pytest.raises(IntegrityError):
            db_session.commit()


    def test_cart_item_created(self, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        cart_item = create_cart_item(db_session, cart, product)
        assert cart_item.id is not None
        assert cart_item.cart_id == cart.id
        assert cart_item.product_id == product.id
        assert cart_item.quantity == 1

    def test_cart_item_without_cart_error(self, db_session):
        product = create_product(db_session)
        cart_item = CartItem(cart_id=None, product_id=product.id, quantity=1)
        db_session.add(cart_item)
        with pytest.raises(IntegrityError):
            db_session.commit()

    def test_cart_item_without_product_error(self, db_session):
        user = create_user(db_session)
        cart = create_cart(db_session, user)
        cart_item = CartItem(cart_id=cart.id, product_id=None, quantity=1)
        db_session.add(cart_item)
        with pytest.raises(IntegrityError):
            db_session.commit()