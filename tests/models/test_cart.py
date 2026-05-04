import pytest
from tests.helper import create_user, create_product, create_cart, create_cart_item

class TestCartModel:

    def test_cart_created(self, db_session):
        user = create_user(db_session)
        cart = create_cart(db_session, user)
        assert cart.id is not None
        assert cart.user_id == user.id

    def test_cart_belongs_to_user(self, db_session):
        user = create_user(db_session)
        cart = create_cart(db_session, user)
        assert cart.user == user

    def test_cart_empty_cart_items(self, db_session):
        user = create_user(db_session)
        cart = create_cart(db_session, user)
        assert cart.cart_items == []

    def test_cart_item_created(self, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        cart_item = create_cart_item(db_session, cart, product)
        assert cart_item.id is not None
        assert cart_item.cart_id == cart.id
        assert cart_item.product_id == product.id
        assert cart_item.quantity == 1