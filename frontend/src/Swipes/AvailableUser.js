import { useState } from "react";
import { Container } from "react-bootstrap";
import UserCard from "./UserCard"
import { EmojiFrown, EmojiLaughing } from "react-bootstrap-icons";
import "./AvailableUser.scss"
import MatchAlert from "./MatchAlert";

/** TODO: */
function AvailableUser({
  like,
  dislike,
  showMatch,
  availableUser,
  resetShowMatch }) {
  const [currentLike, setCurrentLike] = useState(null);

  /** TODO: Checks for match and calls parent like function */
  async function handleLike() {
    setCurrentLike(availableUser);
    await like(availableUser.id);
  }

  /** TODO: calls parent dislike function */
  async function handleDislike() {
    await dislike(availableUser.id);
  }

  return(
    <Container className="AvailableUser">
      {showMatch && <MatchAlert match={currentLike} closeModal={resetShowMatch}/>}
      {availableUser ? (
        <div className="AvailableUser-wrapper">
          <UserCard user={availableUser} />
          <div className="UserCard-actions">
            <button onClick={handleDislike}><EmojiFrown size={30} /></button>
            <button onClick={handleLike}><EmojiLaughing size={30} /></button>
          </div>
        </div>
      ) : (
        <h1>No one left to see! Come back later!</h1>
      )}
    </Container>
  )
}

export default AvailableUser;