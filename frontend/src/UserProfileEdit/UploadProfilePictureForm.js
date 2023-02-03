import { useState, useContext } from 'react';
import userContext from '../userContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AlertContainer from '../AlertContainer';

/** TODO: */

function UploadProfilePictureForm({ uploadPicture }) {
  const { user } = useContext(userContext);
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
    <div className="mt-3 row d-flex justify-content-center">
      <div className="col-10 col-sm-8 col-md-6">
        <img src={user.imageUrl} alt={`${user.firstName}`} />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload Profile Picture</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
          {errors.messages.length > 0 && <AlertContainer alerts={errors} />}
          <Button onClick={handleSubmssion}>Upload Picture</Button>
        </Form>
      </div>
    </div>
  )
}

export default UploadProfilePictureForm;