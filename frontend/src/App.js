import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import Loader from "./Loader";
import RoutesList from "./RoutesList";
import userContext from "./userContext";
import FrienderApi from "./api";
import decode from "jwt-decode";

function App() {
  const initialUser = {
    data: null,
    availableUser: null,
    isLoading: true,
  }
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(function updateLocalStorage() {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token])

  useEffect(function fetchUserWhenMounted() {
    async function fetchUser() {
      if (token) {
        try {
          const { sub } = decode(token);
          FrienderApi.token = token;
          const user = await FrienderApi.getUser(sub);
          // const matches =
          const availableUser = await FrienderApi.getAvailableUser(user.id)
          setUser({
            data: user,
            isLoading: false,
            availableUser: availableUser
          });
        } catch (err) {
          resetUser();
        }
      } else {
        resetUser();
      }
    }
    fetchUser();
  }, [token]);

  /** Resets user to an initial state */
  function resetUser() {
    setUser({
      ...initialUser,
      isLoading: false,
    });
  }

  /** Logs user out of application */
  function logout() {
    setToken(null);
  }

  /** Logs user into application
   *
   * data: {email, password}
   */
  async function login(data) {
    const token = await FrienderApi.login(data)
    setToken(token);
  }

  /** Logs user into application
   *
   * data: {email, password, firstName, lastName, location}
   */
  async function signup(data) {
    const token = await FrienderApi.signup(data)
    setToken(token);
  }

  /** Edit user info
   *
   * data: {email, firstName, lastName, location, bio, radius}
   */
  async function editProfile(data) {
    const newUserData = await FrienderApi.editProfile(data, user.data.id)
    setUser((prev) => ({
      ...prev,
      data: newUserData,
      isLoading: false
    })
    )
  }

  // /**
  //  * Get next available user
  //  */
  // async function getAvailableUser() {
  //   const availableUser = await FrienderApi.getAvailableUser(user.data.id)
  // }

  /** Uploads picture to s3 and saves url in db
   *
   * data: FormData (file data)
   */
  async function uploadPicture(data) {
    await FrienderApi.uploadImage(data);
    setUser((prev) => ({
      ...prev
    }));
  }


  if(user.isLoading) return <Loader/>

  /** Edits a user's profile information and updates across app
   *
   * data: {email, password, firstName, lastName, location, bio, radius}
   */

  return (
    <div className="App">
      {console.log(user)}
      <userContext.Provider value={{ user: user.data }} >
        <BrowserRouter>
          {user.data &&
            <NavBar logout={logout} />
          }
          <RoutesList
            login={login}
            signup={signup}
            uploadPicture={uploadPicture}
            editProfile={editProfile}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;