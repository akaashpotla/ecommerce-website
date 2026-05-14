from tests.helper import create_product

URL = "/api/v1/product"

class TestGetProducts:

    def test_get_products_empty(self, client):
        response = client.get(URL)
        assert response.status_code == 200
        assert len(response.json()["products"]) == 0

    def test_get_products_success(self, client, db_session):
        create_product(db_session, name="Product 1")
        create_product(db_session, name="Product 2")
        response = client.get(URL)
        assert response.status_code == 200
        assert len(response.json()["products"]) == 2

    def test_get_products_returns_correct_fields(self, client, db_session):
        create_product(db_session)
        response = client.get(URL)
        data = response.json()["products"][0]
        assert "id" in data
        assert "name" in data
        assert "description" in data
        assert "price" in data


class TestGetProductId:

    def test_get_product_success(self, client, db_session):
        product = create_product(db_session)
        response = client.get(f"{URL}/{product.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == product.id
        assert data["name"] == product.name
        assert data["price"] == product.price

    def test_get_product_not_found(self, client):
        response = client.get(f"{URL}/99999")
        assert response.status_code == 404

    def test_get_product_invalid_id(self, client):
        response = client.get(f"{URL}/abc")
        assert response.status_code == 422