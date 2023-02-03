import { useState } from "react"
import AlertContainer from '../AlertContainer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

/***
 * TODO:
 */
function Signup({ signup }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    messages: [],
    type: "danger",
  });

  /** Updates state on form input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Calls parent signup and navigates home on submit, or sets error messages */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        messages: err,
      }));
    }
  }
  return (
    <div className="mt-3 row d-flex justify-content-center">
      <div className="col-10 col-sm-8 col-md-6">
        <Card className="p-3">
          <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="text"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Location (Zip Code)</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={handleChange}
                name="location"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="radius">Radius (miles)</Form.Label>
              <Form.Control
                type="number"
                value={formData.radius}
                onChange={handleChange}
                name="radius"
              />
            </Form.Group>
            {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
        <p>Already have an account? <Link to="/login">Login</Link>.</p>
      </div>
    </div>
  );
}

export default Signup;