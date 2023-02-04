import { useState } from "react";
import { Container } from "react-bootstrap";
import UserCard from "./UserCard"
import { EmojiFrown, EmojiLaughing } from "react-bootstrap-icons";
import "./AvailableUser.scss"
import MatchAlert from "./MatchAlert";

/** AvailableUser: Renders the available user component
 *
 * Props:
 * - like: function to call in parent component on like
 * - dislike: function to call in parent component on dislike
 * - showMatch: Boolean indicating if the match screen shows
 * - availableUser: Object containing current user to display
 * - resetShowMatch: function to call in parent component after navigating
 * away from match
 *
 * State:
 * - currentLike: Object containing user that was just liked
 *
 * RoutesList -> AvailableUser -> { userCard, MatchAlert }
 */
function AvailableUser({
  like,
  dislike,
  showMatch,
  availableUser,
  resetShowMatch }) {
  const [currentLike, setCurrentLike] = useState(null);

  /** Calls parent like function and sets current liked user */
  async function handleLike() {
    setCurrentLike(availableUser);
    await like(availableUser.id);
  }

  /** Calls parent dislike function */
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