import { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import userContext from "../userContext";
import UserCard from "./UserCard"

/** TODO: */
function AvailableUser({ getNextAvailableUser, like, dislike }) {
  const { user } = useContext(userContext);
  const [isShowingBio, setIsShowingBio] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  /** TODO: Checks for match and calls parent like function */
  function handleLike() {

  }

  /** TODO: calls parent dislike function */
  function handleDislike() {

  }

  // return <h1>{user.firstName}</h1>
  return(
    <Container>
      <UserCard/>
    </Container>
  )
}

export default AvailableUser;