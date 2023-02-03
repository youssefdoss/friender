import { useState } from "react";
import { Container } from "react-bootstrap";
import UserCard from "./UserCard"
import { EmojiFrown, EmojiLaughing } from "react-bootstrap-icons";

/** TODO: */
function AvailableUser({
  like,
  dislike,
  showMatch,
  availableUser,
  resetShowMatch }) {
  const [isShowingBio, setIsShowingBio] = useState(false);

  /** TODO: Checks for match and calls parent like function */
  async function handleLike() {
    await like(availableUser.id);
  }

  /** TODO: calls parent dislike function */
  async function handleDislike() {
    await dislike(availableUser.id);
  }

  // return <h1>{user.firstName}</h1>
  return(
    <Container>
      {console.log(availableUser)}
      {availableUser ? (
        <>
          <UserCard user={availableUser} />
          {showMatch && <><p>Match!</p><button onClick={resetShowMatch}>X</button></>}
          <div className="UserCard-actions">
            <button onClick={handleDislike}><EmojiFrown size={30} /></button>
            <button onClick={handleLike}><EmojiLaughing size={30} /></button>
          </div>
        </>
      ) : (
        <h1>No one left to see!</h1>
      )}
    </Container>
  )
}

export default AvailableUser;