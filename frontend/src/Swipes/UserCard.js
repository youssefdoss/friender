import { Card } from "react-bootstrap";
import "./UserCard.scss";
import { useState } from "react";

/**
 * TODO: Sample usercard, needs to be hooked up
 */
function UserCard({ user }) {
  const [showBio, setShowBio] = useState(false);

  function toggleBio() {
    if (showBio) {
      setShowBio(false);
    } else {
      setShowBio(true);
    }
  }

  return (
    <Card className="UserCard">
      <img
        className="UserCard-image"
        src={user.imageUrl}
        alt={`${user.firstName} Profile`}
      />
      <button className="btn btn-primary btn-show-bio" onClick={toggleBio}>
       Read bio
      </button>

      {showBio && (
        <div className="UserCard-bio">
          {user.bio === null || user.bio === "" ? "there's nothing to read here" : user.bio}
        </div>
      )}
      <div className="UserCard-info">
        <h2>{user.firstName}</h2>
        <p>Distance (pending)</p>
      </div>
      {/* <button className="btn btn-primary btn-unmatch">Unmatch</button> */}
    </Card>
  );
}

export default UserCard;
