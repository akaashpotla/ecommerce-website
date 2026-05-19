from tests.helper import create_user, create_product, create_cart, create_cart_item, EMAIL, PASSWORD, login

URL = "/api/v1/cart"
AUTH_URL = "/api/v1/user/auth"

class TestAddToCart:

    def test_add_to_cart_success(self, client, db_session):
        create_user(db_session)
        product = create_product(db_session)
        login(client)
        response = client.post(URL, json={"product_id": product.id, "quantity": 1})
        assert response.status_code == 201
        data = response.json()
        assert len(data["cart_items"]) == 1
        assert data["cart_items"][0]["product_id"] == product.id

class TestGetCart:

    def test_get_cart_success(self, client, db_session):
        user = create_user(db_session)
        product = create_product(db_session)
        cart = create_cart(db_session, user)
        create_cart_item(db_session, cart, product)
        login(client)
        response = client.get(URL)
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == user.id
        assert len(data["cart_items"]) == 1

    def test_get_cart_empty(self, client, db_session):
        create_user(db_session)
        login(client)
        response = client.get(URL)
        assert response.status_code == 404
