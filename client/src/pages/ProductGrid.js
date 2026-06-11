import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav, Spinner, Alert } from 'react-bootstrap';
import { FaCartShopping } from "react-icons/fa6";

function ProductGrid() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState({ loading: true, error: null });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/product', {
                    credentials: 'include'
                });
                if (res.status === 401) {
                    navigate('/login');
                    return;
                }
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data.products);
                setStatus({ loading: false, error: null });
            } catch (err) {
                setStatus({ loading: false, error: err.message });
            }
        };
        fetchProducts();
    }, [navigate]);

    if (status.loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading products...</p>
        </Container>
    );

    if (status.error) return (
        <Container className="mt-5">
            <Alert variant="danger">{status.error}</Alert>
        </Container>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar bg="dark" variant="dark" className="px-4 mb-4">
                <Navbar.Brand className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Motor Bay
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Button
                        variant="outline-light"
                        className="me-2"
                        onClick={() => navigate('/cart')}
                    >
                        <FaCartShopping />
                    </Button>
                </Nav>
                <Button variant="outline-light" onClick={() => navigate('/login')}>
                    Logout
                </Button>
            </Navbar>

            <Container>
                <h4 className="fw-bold mb-4">All Products</h4>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {products.map((product) => (
                        <Col key={product.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{product.name}</Card.Title>
                                    <Card.Text className="text-muted small flex-grow-1">
                                        {product.description}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="fw-bold text-primary fs-5">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <Button
                                            variant="dark"
                                            size="sm"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            View
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ProductGrid;