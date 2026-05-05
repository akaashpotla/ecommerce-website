import pytest
from tests.helper import create_user, create_product, create_cart, create_cart_item, create_order

class TestOrderModel:

    def test_order_created(self, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        create_cart_item(db_session, cart, product)
        order = create_order(db_session, user, cart, total=5.99, quantity=1)
        assert order.id is not None
        assert order.user_id == user.id
        assert order.cart_id == cart.id
        assert order.total == 5.99

    def test_order_belongs_to_user(self, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        create_cart_item(db_session, cart, product)
        order = create_order(db_session, user, cart)
        assert order.user == user

    def test_order_belongs_to_cart(self, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        create_cart_item(db_session, cart, product)
        order = create_order(db_session, user, cart)
        assert order.cart == cart