import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function PostJob() {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Post Job</h2>
      
      <Form>
        {/* Post Title */}
        <Form.Group controlId="formPostTitle" className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" placeholder="Enter post title" />
        </Form.Group>

        {/* Location */}
        <Form.Group controlId="formLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form.Group>

        {/* Close Date */}
        <Form.Group controlId="formCloseDate" className="mb-3">
          <Form.Label>Close Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter job description" />
        </Form.Group>

        {/* Phone and Email */}
        <Row>
          <Col>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
        </Row>

        {/* Content */}
        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter additional content" />
        </Form.Group>

        {/* Buttons: Post and Cancel */}
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary" className="me-2">Cancel</Button>
          <Button variant="primary" type="submit">Post</Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostJob;
