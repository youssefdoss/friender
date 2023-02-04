import { useState } from "react"
import AlertContainer from '../AlertContainer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import "./auth.scss";
import logo from "../assets/friender-logo.svg";

/** Login: Renders login form
 *
 * Props:
 * - login: function called in parent component to login
 *
 * state:
 * - formData: Object of form data
 *
 * RoutesList -> Login
 */
function Login({ login }){
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  /** Calls parent login and navigates home on submit, or sets error messages */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        messages: err,
      }));
    }
  }

  return (
    <div className="auth">
      <div className="col-10 col-sm-8 col-md-6 col-lg-3">
      <img src={logo} className="logo mb-3" alt="friender logo"/>
        <h2 className="title pb-2">login to friender</h2>
        {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formData.email}
                placeholder="email"
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={formData.password}
                placeholder="password"
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card>
        <p className="mt-4">Don't have an account? <Link to="/signup">Sign up</Link>.</p>
      </div>
    </div>
  );
}

export default Login