import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import MatchList from "./Matches/MatchList"
import Profile from "./Profile/Profile"
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit"
import userContext from "./userContext";
import AvailableUser from './Swipes/AvailableUser';
import { useContext } from "react";
import NotFound from "./NotFound";

/** TODO: */
function RoutesList({ login, signup }){
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
          <Route path="/matches" element={<MatchList/>}/>
          <Route path="/edit-profile" element={<UserProfileEdit/>}/>
          <Route path="/users/:id" element={<Profile/>}/>
          <Route path="/" element={<AvailableUser/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </>
      }
    </Routes>
  )
}
export default RoutesList