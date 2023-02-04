import { useState } from "react"
import AlertContainer from '../AlertContainer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import "./auth.scss";
import logo from "../assets/friender-logo.svg";

/** Signup: Renders signup form
 *
 * Props:
 * - signup: function called in parent component to signup
 *
 * state:
 * - formData: Object of form data
 *
 * RoutesList -> signup
 */
function Signup({ signup }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "",
    radius: "",
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
    <div className="Signup auth">
      <div className="col-10 col-sm-8 col-md-6 col-lg-3">
        <img src={logo} className="logo mb-3" alt="friender logo"/>
        <h2 className="title pb-2">sign up for friender</h2>
        {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                placeholder="first name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                placeholder="last name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.location}
                onChange={handleChange}
                name="location"
                placeholder="location (zip code)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.radius}
                onChange={handleChange}
                name="radius"
                placeholder="radius (miles)"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card>
        <p className="mt-4">Already have an account? <Link to="/login">Login</Link>.</p>
      </div>
    </div>
  );
}

export default Signup;