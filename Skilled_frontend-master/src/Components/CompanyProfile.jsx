import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const CompanyProfile = () => {
  return (
    <Container fluid style={{ backgroundColor: '#B4E0FD', height: '100vh' }} className="d-flex align-items-center justify-content-center">
      <Row className="w-100" style={{ maxWidth: '1200px' }}>
        {/* Left Side - Profile Details Form */}
        <Col md={6} className="p-5 bg-white rounded">
          <h3 className="text-center mb-4">Profile Details</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Company Name" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Address" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Industry" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Logo:</Form.Label>
                  <Button variant="primary" className="w-100" style={{ backgroundColor: '#144B7D' }}>UPLOAD</Button>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="w-100 mb-3" style={{ backgroundColor: '#144B7D' }}>
              SAVE CHANGES
            </Button>

          </Form>
        </Col>

        {/* Right Side - Recently Published Ads */}
        <Col md={6} className="px-4">
          <h4 className="text-center mb-4">Recently Published Ads</h4>

          {/* Ad Card */}
          {['Ad 1', 'Ad 2', 'Ad 3'].map((ad, idx) => (
            <Card className="mb-3" key={idx}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {/* Google Icon */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" style={{ width: '50px', marginRight: '10px' }} />
                  <div>
                    <h6 className="mb-0">JOB TITLE</h6>
                    <small>Company Name</small><br />
                    <small>2 hours ago</small>
                  </div>
                </div>
                <div className="text-end">
                  <small>Location</small><br />
                  <a href="#" className="text-primary">VIEW DETAILS</a>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;