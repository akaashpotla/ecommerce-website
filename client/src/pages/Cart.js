import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Spinner, Alert, Card } from 'react-bootstrap';

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState({ loading: true, error: null });
    const [message, setMessage] = useState(null);
    const [submittingOrder, setSubmittingOrder] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/cart', {
                credentials: 'include'
            });

            if (res.status === 401) {
                navigate('/login');
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to fetch cart');
            }

            const data = await res.json();
            setCartItems(data.cart_items || []);
            setStatus({ loading: false, error: null });

        } catch (err) {
            setStatus({
                loading: false,
                error: err.message
            });
        }
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const res = await fetch(`http://localhost:8000/api/v1/cart/${cartItemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (res.status === 401) {
                navigate('/login');
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setCartItems(data.cart_items || []);
                setMessage(null);
            } else {
                throw new Error('Failed to update quantity');
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    const handleDelete = async (cartItemId) => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/cart/${cartItemId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.status === 401) {
                navigate('/login');
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to remove item');
            }

            setCartItems(prev => prev.filter(item => item.id !== cartItemId));
            setMessage({ type: 'success', text: 'Item removed from cart' });

        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    const handlePlaceOrder = async () => {
        setSubmittingOrder(true);
        setMessage(null);

        try {
            const res = await fetch('http://localhost:8000/api/v1/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ items: cartItems }) 
            });

            if (res.status === 401) {
                navigate('/login');
                return;
            }

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || 'Failed to submit order');
            }

            setCartItems([]);
            navigate('/orderconfirmation');
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
            setSubmittingOrder(false);
        } 
    };

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);

    if (status.loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (status.error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{status.error}</Alert>
            </Container>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar bg="dark" variant="dark" className="px-4 mb-4">
                <Navbar.Brand className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Car Parts
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Button
                        variant="outline-light"
                        className="me-2"
                        onClick={() => navigate('/home')}
                    >
                        Products
                    </Button>
                </Nav>
                <Button
                    variant="outline-light"
                    onClick={() => navigate('/login')}
                >
                    Logout
                </Button>
            </Navbar>

            <Container style={{ maxWidth: '800px' }}>
                <h2 className="fw-bold mb-4">Your Cart</h2>
                
                {message && (
                    <Alert variant={message.type === 'success' ? 'success' : 'danger'}>
                        {message.text}
                    </Alert>
                )}

                {cartItems.length === 0 ? (
                    <Alert variant="secondary">
                        Your cart is empty.
                    </Alert>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Card className="mb-3 shadow-sm" key={item.id}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="fw-bold mb-1">{item.product.name}</h5>
                                            <div className="d-flex align-items-center gap-2 my-2">
                                                <span className="text-muted me-1">Quantity:</span>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || submittingOrder}
                                                >
                                                    -
                                                </Button>
                                                <span className="fw-bold px-1">{item.quantity}</span>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={submittingOrder}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                            <div className="text-primary fw-bold">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(item.id)}
                                            disabled={submittingOrder}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                        <Card className="shadow-sm mt-4 border-0">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="mb-0 fw-bold">Total</h4>
                                    <h4 className="mb-0 text-success fw-bold">
                                        ${total.toFixed(2)}
                                    </h4>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button 
                                        variant="primary" 
                                        className="fw-bold shadow-sm px-4 py-2" 
                                        onClick={handlePlaceOrder}
                                        disabled={submittingOrder || cartItems.length === 0}
                                    >
                                        {submittingOrder ? (
                                            <>
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Place Order'
                                        )}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Cart;