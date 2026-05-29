import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Navbar, Nav, Spinner, Alert, Form, Card } from 'react-bootstrap';

function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState({ loading: true, error: null });
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/product/${id}`, {
                    credentials: 'include'
                });
                if (res.status === 401) { navigate('/login'); return; }
                if (!res.ok) throw new Error('Failed to fetch product');
                const data = await res.json();
                setProduct(data);
                setStatus({ loading: false, error: null });
            } catch (err) {
                setStatus({ loading: false, error: err.message });
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ product_id: product.id, quantity })
            });
            if (res.status === 401) { navigate('/login'); return; }
            if (!res.ok) throw new Error('Failed to add to cart');
            setMessage({ type: 'success', text: 'Added to cart successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    if (status.loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
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
                <Navbar.Brand className="fw-bold">Car Parts</Navbar.Brand>
                <Nav className="me-auto">
                    <Button
                        variant="outline-light"
                        className="me-2"
                        onClick={() => navigate('/cart')}
                    >
                    Cart
                        </Button>
                </Nav>
                <Button variant="outline-light" className="me-2" onClick={() => navigate('/home')}>
                    Back to Products
                </Button>
                <Button variant="outline-light" onClick={() => navigate('/login')}>
                    Logout
                </Button>
            </Navbar>

            <Container style={{ maxWidth: '600px' }}>
                <Card className="shadow-sm p-4">
                    <Card.Body>
                        <h2 className="fw-bold mb-1">{product.name}</h2>
                        <p className="text-muted mb-3">{product.description}</p>
                        <h3 className="text-primary fw-bold mb-4">${product.price.toFixed(2)}</h3>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                style={{ width: '100px' }}
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button variant="dark" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/home')}>
                                Back
                            </Button>
                        </div>

                        {message && (
                            <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mt-3">
                                {message.text}
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default ProductView;