import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import MatchList from "./Matches/MatchList"
import Profile from "./Profile/Profile"
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit"
import userContext from "./UserContext";
import { useContext } from "react";
import NotFound from "./NotFound";

function RoutesList(){
  const { user } = useContext(userContext)
  return(
    <Routes>
      {!user &&
        <>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </>
      }
      {user &&
        <>
          <Route path="/matches" element={<MatchList/>}/>
          <Route path="/edit-profile" element={<UserProfileEdit/>}/>
          <Route path="/users/:id" element={<Profile/>}/>
          <Route path="/" element={<UserProfileEdit/>}/>
          <Route path="*" element={<NotFound/>}/>
        </>
      }
    </Routes>
  )
}
export default RoutesList