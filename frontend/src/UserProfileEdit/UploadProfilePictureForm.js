import { useState, useContext } from "react";
import userContext from "../userContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertContainer from "../AlertContainer";
import { Card } from "react-bootstrap";
import "./UploadProfilePictureForm.scss";

/** TODO: */

function UploadProfilePictureForm({ uploadPicture }) {
  const { user } = useContext(userContext);
  const [selectedFile, setSelectedFile] = useState();
  const [errors, setErrors] = useState({
    messages: [],
    type: "danger",
  });

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
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        messages: err,
      }));
    }
  }

  return (
    <div className="UploadProfilePictureForm col-12 col-md-6">
      <Card className="picture-preview">
        <img src={user.imageUrl} alt={`${user.firstName}`} />
      </Card>
      <Form onSubmit={handleSubmssion}>
        <div className="input-group mt-4">
          <Form.Control type="file" onChange={handleChange} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </div>
        {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
      </Form>
    </div>
  );
}

export default UploadProfilePictureForm;
