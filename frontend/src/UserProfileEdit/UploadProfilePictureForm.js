import { useState, useContext } from "react";
import userContext from "../userContext";
import Form from "react-bootstrap/Form";
import AlertContainer from "../AlertContainer";
import { Card } from "react-bootstrap";
import "./UploadProfilePictureForm.scss";

/** UploadProfilePictureForm: renders form to upload prof pic
 *
 * Props:
 * - uploadPicture: function to be called in parent to upload picture
 *
 * state:
 * - selectedFile: currently selected image
 * - alerts: Array of alerts to be displayed
 *
 * UserProfileEdit -> UploadProfilePictureForm -> AlertContainer
 */

function UploadProfilePictureForm({ uploadPicture }) {
  const DEFAULT_ERRORS= {
    messages: [],
    type: "danger",
  }
  const { user } = useContext(userContext);
  const [selectedFile, setSelectedFile] = useState();
  const [alerts, setAlerts] = useState(DEFAULT_ERRORS);

  /** Updates selected file on change */
  function handleChange(evt) {
    setSelectedFile(evt.target.files[0]);
  }

  /** Handles form submission and calls parent upload function */
  async function handleSubmssion(evt) {
    evt.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await uploadPicture(formData);
      setAlerts((prev) => ({
        ...prev,
        messages: ["Successfully updated picture!"],
        type: "success"
      }));
    } catch (err) {
      setAlerts((prev) => ({
        ...prev,
        messages: err,
      }));
    }
  }

  return (
    <div className="UploadProfilePictureForm col-12 col-md-6">
      {alerts.messages.length > 0 && <AlertContainer alerts={alerts} />}
      <Card className="picture-preview mb-4">
        <img src={user.imageUrl} alt={`${user.firstName}`} />
      </Card>
      <Form onSubmit={handleSubmssion}>
        <div className="input-group">
          <Form.Control type="file" onChange={handleChange} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default UploadProfilePictureForm;
