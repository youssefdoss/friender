import UploadProfilePictureForm from "./UploadProfilePictureForm";
import UserProfileEditForm from "./UserProfileEditForm";

/** TODO: */
function UserProfileEdit({ uploadPicture, editProfile }) {
  return (
    <>
      <UserProfileEditForm editProfile={editProfile}/>
      <UploadProfilePictureForm uploadPicture={uploadPicture} />
    </>
  )
}

export default UserProfileEdit