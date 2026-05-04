import pytest
from tests.helper import create_product

class TestProductModel:

    def test_product_created(self, db_session):
        product = create_product(db_session)
        assert product.name == "Test Product"
        assert product.description == "A product"
        assert product.price == 5.99
        assert product.id is not None

    def test_product_empty_cart_items(self, db_session):
        product = create_product(db_session)
        assert product.cart_items == []