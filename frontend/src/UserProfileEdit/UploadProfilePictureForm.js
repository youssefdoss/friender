import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AlertContainer from '../AlertContainer';

/** TODO: */

function UploadProfilePictureForm({ uploadPicture }) {
  const [selectedFile, setSelectedFile] = useState();
  const [errors, setErrors] = useState({
    messages: [],
    type: 'danger',
  })

  /** Updates selected file on change */
  function handleChange(evt) {
    setSelectedFile(evt.target.files[0]);
  }

  /** Handles form submission and calls parent upload function */
  async function handleSubmssion() {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await uploadPicture(formData);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        messages: err,
      }));
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Upload Profile Picture</Form.Label>
        <Form.Control type="file" onChange={handleChange} />
      </Form.Group>
      {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
      <Button onClick={handleSubmssion}>Upload Picture</Button>
    </Form>
  )
}

export default UploadProfilePictureForm;