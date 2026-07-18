import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Spinner, Alert, Card } from 'react-bootstrap';
import API_URL from '../api';

function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState({ loading: true, error: null });

    const fetchOrders = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/order`, {
                credentials: 'include'
            });
            if (res.status === 401) { navigate('/login'); return; }
            if (!res.ok) throw new Error('Failed to fetch orders');
            const data = await res.json();
            setOrders(data.orders);
            setStatus({ loading: false, error: null });
        } catch (err) {
            setStatus({ loading: false, error: err.message });
        }
    }, [navigate]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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
                <Navbar.Brand className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Parts Plus
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Button variant="outline-light" className="me-2" onClick={() => navigate('/home')}>
                        Products
                    </Button>
                </Nav>
                <Button variant="outline-light" onClick={() => navigate('/login')}>
                    Logout
                </Button>
            </Navbar>

            <Container style={{ maxWidth: '800px' }}>
                <h2 className="fw-bold mb-4">Order History</h2>

                {orders.length === 0 ? (
                    <Alert variant="secondary">You have no orders yet.</Alert>
                ) : (
                    orders.map(order => (
                        <Card key={order.id} className="mb-3 shadow-sm">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fw-bold mb-1">Order #{order.id}</p>
                                    <p className="text-muted mb-0">Cart ID: {order.cart_id}</p>
                                </div>
                                <h5 className="text-success fw-bold mb-0">
                                    ${order.total.toFixed(2)}
                                </h5>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        </div>
    );
}

export default OrderHistory;