import { Container } from "react-bootstrap";
import UploadProfilePictureForm from "./UploadProfilePictureForm";
import UserProfileEditForm from "./UserProfileEditForm";
import "./UserProfileEdit.scss"

/** TODO: */
function UserProfileEdit({ uploadPicture, editProfile }) {
  return (
    <Container className="UserProfileEdit mt-5">
      <h1>Edit Profile</h1>
      <div className="row">
        <UserProfileEditForm editProfile={editProfile}/>
        <UploadProfilePictureForm uploadPicture={uploadPicture} />
      </div>
    </Container>
  )
}

export default UserProfileEdit