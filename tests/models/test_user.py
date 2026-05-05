import pytest
from sqlalchemy.exc import IntegrityError
from app.models import User
from tests.helper import NAME, EMAIL, PASSWORD, create_user

class TestUser:

    def test_create_user_success(self, db_session):
        user = create_user(db_session)
        assert user.name == NAME
        assert user.email == EMAIL
        assert user.id is not None

    def test_user_empty_cart(self, db_session):
        user = create_user(db_session)
        assert user.cart == []
    
    def test_user_empty_orders(self, db_session):
        user = create_user(db_session)
        assert user.orders == []

    def test_user_name_error(self, db_session):
        user = User(email=EMAIL, password=PASSWORD)
        db_session.add(user)
        with pytest.raises(IntegrityError):
            db_session.commit()

    def test_user_email_error(self, db_session):
        user = User(name=NAME, password=PASSWORD)
        db_session.add(user)
        with pytest.raises(IntegrityError):
            db_session.commit()
            
    def test_user_password_error(self, db_session):
        user = User(name=NAME, email=EMAIL)
        db_session.add(user)
        with pytest.raises(IntegrityError):
            db_session.commit()
