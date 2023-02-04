import { useState, useContext } from "react";
import userContext from "../userContext";
import AlertContainer from "../AlertContainer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
/** UserProfileEditForm: Renders user profile edit form
 *
 * Props:
 * - editProfile: function to be called in parent to edit profile
 *
 * State:
 * - formData: Current form data
 * - alerts: alerts to be displayed
 *
 * UserProfileEdit -> UserProfileEditForm -> AlertContainer
 */
function UserProfileEditForm({ editProfile }) {
  const { user } = useContext(userContext);
  const initialData = {
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    bio: user.bio || "",
    radius: user.radius || 1000,
  };
  const [formData, setFormData] = useState(initialData);

  const [alerts, setAlerts] = useState({
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
      await editProfile(formData);

      setAlerts({
        messages: ["Updated profile successfully"],
        type: "success",
      });
    } catch (err) {
      setAlerts((prev) => ({
        ...prev,
        messages: err,
        type: "danger",
      }));
    }
  }

  return (
    <div className="col-12 col-md-6">
      {alerts.messages.length > 0 && <AlertContainer alerts={alerts} />}
      <Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastName">Last Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="location">Location (Zip Code)</Form.Label>
            <Form.Control
              type="number"
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
          <Form.Group className="mb-3">
            <Form.Label htmlFor="bio">Bio (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.bio}
              onChange={handleChange}
              name="bio"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default UserProfileEditForm;
