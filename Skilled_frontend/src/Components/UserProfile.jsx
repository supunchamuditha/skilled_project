import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <Container fluid style={{ backgroundColor: '#B4E0FD', height: '100vh' }} className="d-flex align-items-center justify-content-center">
      <Row className="w-100" style={{ maxWidth: '1200px' }}>
        {/* Left Side - My Details Form */}
        <Col md={6} className="p-5 bg-white rounded">
          <h3 className="text-center mb-4">My Details</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Name" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Home Town" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" style={{ backgroundColor: '#E0F2FF' }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender:</Form.Label>
              <div>
                <Form.Check inline label="Male" name="gender" type="radio" id="male" />
                <Form.Check inline label="Female" name="gender" type="radio" id="female" />
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture:</Form.Label>
                  <Button variant="primary" className="w-100" style={{ backgroundColor: '#144B7D' }}>UPLOAD</Button>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CV:</Form.Label>
                  <Button variant="primary" className="w-100" style={{ backgroundColor: '#144B7D' }}>UPLOAD</Button>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="w-100" style={{ backgroundColor: '#144B7D' }}>
              Save Changes
            </Button>
          </Form>
        </Col>

        {/* Right Side - Applied Job History */}
        <Col md={6} className="px-4">
          <h4 className="text-center mb-4">Applied Job History</h4>

          {/* Job Card */}
          {['Job 1', 'Job 2', 'Job 3'].map((job, idx) => (
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

export default UserProfile;