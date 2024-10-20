import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { registerCompany } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterRec = () => {
  const { register, loading, message, error, isVerified } = registerCompany();
  const navigate = useNavigate();

  const [captchaToken, setCaptchaToken] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    address: "",
    phone: "",
    industry: "",
    password: "",
    confirmPassword: "",
  });

  const [logo, setLogo] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the Captcha verification");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.company_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("location", formData.address);
    formDataToSend.append("phone_num", formData.phone);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("logo", logo);
    formDataToSend.append("captchaToken", captchaToken);

    await register(formDataToSend);

    if (!error) {
      if (!isVerified) {
        navigate("/verify");
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Register as Recruiter</h2>
        <br />

        {/* Display Success or Error Messages */}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {validationError && <Alert variant="warning">{validationError}</Alert>} */}

        <Form onSubmit={handleSubmit} noValidate>
          {/* Company Name Input */}
          <Form.Group controlId="formCompanyName" className="mb-3">
            <Form.Control
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
            />
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
            />
          </Form.Group>

          {/* Address Input */}
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
            />
          </Form.Group>

          {/* Phone Input */}
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
            />
          </Form.Group>

          {/* Industry Input */}
          <Form.Group controlId="formIndustry" className="mb-3">
            <Form.Control
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
            />
          </Form.Group>

          {/* Logo Upload */}
          <Row>
            <Col>
              <Form.Group controlId="formProfilePicture" className="mb-3">
                <Form.Label>Company Logo:</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-2"
                  style={{ backgroundColor: "#E0F2FF", border: "none" }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
              //   isInvalid={
              //     formData.password.length > 0 && formData.password.length < 8
              //   }
            />
            <Form.Control.Feedback type="invalid">
              Password must be at least 8 characters long.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Password should be comprised of at least 8 characters
            </Form.Text>
          </Form.Group>

          {/* Confirm Password Input */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              required
              //   isInvalid={
              //     formData.confirmPassword.length > 0 &&
              //     formData.password !== formData.confirmPassword
              //   }
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Google reCAPTCHA */}
          <ReCAPTCHA
            sitekey="6Le0oUYqAAAAAJNvvKKCKMIdIFC7AQwT1QRKoZyt" // Your site key
            onChange={handleCaptchaChange}
          />

          {/* Create Account Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            // disabled={loading || validationError !== ""}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {" Registering..."}
              </>
            ) : (
              "CREATE ACCOUNT"
            )}
          </Button>
        </Form>

        {/* Sign In Section */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an Account?{" "}
            <a href="#" className="text-primary">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisterRec;
