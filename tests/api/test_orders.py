from tests.helper import create_user, create_product, create_cart, create_cart_item, login

URL = "/api/v1/order"

class TestCreateOrder:

    def test_create_order_success(self, client, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        create_cart_item(db_session, cart, product, quantity=2)
        login(client)
        response = client.post(URL)
        assert response.status_code == 201
        data = response.json()
        assert data["user_id"] == user.id
        assert data["cart_id"] == cart.id
        assert data["total"] == product.price * 2

    def test_create_order_no_cart(self, client, db_session):
        create_user(db_session)
        login(client)
        response = client.post(URL)
        assert response.status_code == 404

    def test_create_order_unauthorized(self, client):
        response = client.post(URL)
        assert response.status_code == 401