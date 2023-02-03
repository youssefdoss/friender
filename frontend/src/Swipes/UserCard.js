import { Card } from "react-bootstrap";
import "./UserCard.scss";
import { EmojiFrown, EmojiLaughing } from "react-bootstrap-icons";

/**
 * TODO: Sample usercard, needs to be hooked up
 */
function UserCard() {
  return (
    <Card className="UserCard">
      <img
        className="UserCard-image"
        src="https://r29-friender.s3.us-west-1.amazonaws.com/user10_image.png"
        alt="preview"
      />
      {/* <div class="UserCard-bio">
        "Looking to make cool friends!"
      </div> */}
      <div className="UserCard-info">
        <h2>Diane</h2>
        <p>15 miles away</p>
        <div className="UserCard-actions">
          <button><EmojiFrown size={30} /></button>
          <button><EmojiLaughing size={30} /></button>
        </div>
      </div>
      {/* <button className="btn btn-primary btn-unmatch">Unmatch</button> */}
    </Card>
  );
}

export default UserCard;
