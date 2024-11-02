import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, ToggleButton, ButtonGroup } from 'react-bootstrap';


const JobList = () => {
  const [selectedLocation, setSelectedLocation] = useState(false);

  const jobs = new Array(12).fill({
    title: 'JOB TITLE',
    company: 'Company Name',
    timeAgo: '2 hours ago',
    location: 'Location',
  });

  return (
    <>

    <div className="container mt-4">
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <div>
            <h5>Time</h5>
            <Form.Select>
              <option>Newest First</option>
              <option>Oldest First</option>
            </Form.Select>
          </div>

          <div className="mt-3">
            <h5>Salary</h5>
            <Form.Check label="0 LKR - 50,000 LKR" />
            <Form.Check label="50,000 LKR - 100,000 LKR" />
            <Form.Check label="100,000 LKR - 200,000 LKR" />
            <Form.Check label="200,000 LKR - 500,000 LKR" />
            <Form.Check label="500,000 LKR and Above" />
          </div>

          <div className="mt-3">
            <h5>Job Type</h5>
            <Form.Check label="Full-time" />
            <Form.Check label="Part-time" />
            <Form.Check label="Other" />
          </div>

          <div className="mt-3">
            <h5>Location</h5>
            <Form.Check 
              type="switch" 
              id="location-switch" 
              label="In the country" 
              checked={selectedLocation}
              onChange={() => setSelectedLocation(!selectedLocation)}
            />
          </div>
        </Col>

        {/* Job Listings Section */}

        <Col md={9}>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>Showing 12 Results from 21</p>
            <div>
              <Button variant="light" className="me-1">{'<'}</Button>
              <Button variant="light">{'>'}</Button>
            </div>
          </div>

          <Row>
            {jobs.map((job, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className="p-3">
                  <Row>
                    <Col md={2}>
                      <img
                        src="https://via.placeholder.com/50"
                        alt="company logo"
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={10}>
                      <h6>{job.title}</h6>
                      <p className="mb-1">{job.company}</p>
                      <small>{job.timeAgo}</small>
                      <div className="d-flex justify-content-between mt-2">
                        <small>{job.location}</small>
                        <a href="/jobAdPage">View Details</a>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
    </>
  );

};

export default JobList;
