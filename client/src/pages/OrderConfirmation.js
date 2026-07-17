import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Card, Button } from 'react-bootstrap';

function OrderConfirmation() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar bg="dark" variant="dark" className="px-4 mb-4">
                <Navbar.Brand className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Parts Plus
                </Navbar.Brand>
            </Navbar>
            <Container className="text-center mt-5" style={{ maxWidth: '500px' }}>
                <Card className="shadow p-5 border-0">
                    <Card.Body>
                        <div className="text-success display-3 mb-3">✓</div>
                        <h2 className="fw-bold mb-3">Order Placed!</h2>
                        <p className="text-muted mb-4">
                            Thank you for your purchase. Your car parts order has been submitted successfully and is processing.
                        </p>
                        <Button variant="primary" className="w-100 fw-bold" onClick={() => navigate('/home')}>
                            Continue Shopping
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default OrderConfirmation;