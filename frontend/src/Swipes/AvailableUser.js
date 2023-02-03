import { useState, useContext } from "react";
import userContext from "../userContext";
/** TODO: */
function AvailableUser() {
  const { user } = useContext(userContext);

  return <h1>{user.firstName}</h1>
}

export default AvailableUser;