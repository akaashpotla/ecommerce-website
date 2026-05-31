import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaTools, FaTruck, FaShieldAlt } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      name: 'Oil Filter',
      price: '$8.99'
    },
    {
      name: 'Brake Pads',
      price: '$34.99'
    },
    {
      name: 'Alternator',
      price: '$89.99'
    },
    {
      name: 'Spark Plugs',
      price: '$24.99'
    }
  ];

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fw-bold fs-3">
            CarParts
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>

            <Button
              variant="warning"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div
        style={{
          background:
            'linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url("https://images.unsplash.com/photo-1487754180451-c456f719a1fc") center/cover',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Container>
          <Row>
            <Col lg={7}>
              <h1 className="display-3 fw-bold mb-4">
                Premium Car Parts
                <br />
                At Affordable Prices
              </h1>

              <p className="lead mb-4">
                Shop quality replacement parts for your vehicle.
                Fast shipping, trusted brands, and competitive pricing.
              </p>

              <Button
                size="lg"
                variant="warning"
                className="me-3"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>

              <Button
                size="lg"
                variant="outline-light"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Container>
      </div>


      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">
          Why Choose Us?
        </h2>

        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <FaTools size={45} className="mb-3" />
                <h5>Quality Parts</h5>
                <p className="text-muted">
                  All parts are sourced from trusted manufacturers.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <FaTruck size={45} className="mb-3" />
                <h5>Fast Shipping</h5>
                <p className="text-muted">
                  Get your parts delivered quickly.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <FaShieldAlt size={45} className="mb-3" />
                <h5>Warranty Included</h5>
                <p className="text-muted">
                  Coverage on many of our products.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <FaCar size={45} className="mb-3" />
                <h5>Wide Selection</h5>
                <p className="text-muted">
                  Parts for domestic and import vehicles.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">
            Popular Products
          </h2>

          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col md={3} key={product.name}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>

                    <h4 className="text-primary">
                      {product.price}
                    </h4>

                    <Button
                      variant="dark"
                      className="w-100 mt-3"
                      onClick={() => navigate('/login')}
                    >
                      View Product
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="bg-dark text-white text-center py-5">
        <Container>
          <h2 className="fw-bold mb-3">
            Ready to Upgrade Your Vehicle?
          </h2>

          <p className="lead mb-4">
            Join today and start shopping premium automotive parts.
          </p>

          <Button
            size="lg"
            variant="warning"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;