import { Card } from "react-bootstrap";
import "./UserCard.scss";

/**
 * TODO: Sample usercard, needs to be hooked up
 */
function UserCard({ user }) {
  return (
    <Card className="UserCard">
      <img
        className="UserCard-image"
        src={user.imageUrl}
        alt={`${user.firstName} Profile`}
      />
      {/* <div class="UserCard-bio">
        "Looking to make cool friends!"
      </div> */}
      <div className="UserCard-info">
        <h2>{user.firstName}</h2>
        <p>Distance (pending)</p>
      </div>
      {/* <button className="btn btn-primary btn-unmatch">Unmatch</button> */}
    </Card>
  );
}

export default UserCard;
