import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import RoutesList from "./RoutesList";
import userContext from "./userContext";
import FrienderApi from "./api";
import decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({
    data: null,
    isLoading: true,
  });
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
          setUser({
            data: user,
            isLoading: false,
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
      data: null,
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

  /** Uploads picture to s3 and saves url in db
   *
   * data: FormData (file data)
   */
  async function uploadPicture(data) {
    const res = await FrienderApi.uploadImage(data);
    setUser((prev) => ({
      ...prev,
      data: {
        ...data,
        imageUrl: res
      }
    }));
  }


  if(user.isLoading) return <h1>loading...</h1>

  /** Edits a user's profile information and updates across app
   *
   * data: {email, password, firstName, lastName, location, bio, radius}
   */

  return (
    <div className="App">
      <userContext.Provider value={{ user: user.data }} >
        <BrowserRouter>
          {user.data &&
            <NavBar logout={logout} />
          }
          <RoutesList
            login={login}
            signup={signup}
            uploadPicture={uploadPicture}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;