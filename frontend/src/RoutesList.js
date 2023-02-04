import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import MatchList from "./Matches/MatchList"
import Profile from "./Profile/Profile"
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit"
import userContext from "./userContext";
import AvailableUser from './Swipes/AvailableUser';
import { useContext } from "react";

/** TODO: */
function RoutesList({
  login,
  signup,
  editProfile,
  uploadPicture,
  like,
  dislike,
  showMatch,
  availableUser,
  resetShowMatch,
  matches
}) {
  const { user } = useContext(userContext)
  return(
    <Routes>
      {!user &&
        <>
          <Route path="/login" element={<Login login={login}/>}/>
          <Route path="/signup" element={<Signup signup={signup}/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </>
      }
      {user &&
        <>
          <Route path="/matches" element={<MatchList matches={matches}/>}/>
          <Route path="/profile/:id" element={<Profile matches={matches}/>}/>
          <Route path="/edit-profile" element={
            <UserProfileEdit
              editProfile={editProfile}
              uploadPicture={uploadPicture}
            />
          }/>
          <Route path="/" element={
            <AvailableUser
              like={like}
              dislike={dislike}
              showMatch={showMatch}
              availableUser={availableUser}
              resetShowMatch={resetShowMatch}
            />
          }/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </>
      }
    </Routes>
  )
}
export default RoutesList