import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar/NavBar';
import Loader from './Loader';
import RoutesList from './RoutesList';
import userContext from './userContext';
import FrienderApi from './api';
import decode from 'jwt-decode';

/** App: Renders friender app
 *
 * State:
 * - user: Object of logged in user
 * - token: String token of logged in user
 * - showMatch: Boolean to be drilled down indicating if match is showing
 *
 * App -> RoutesList
 */

function App() {
  const initialUser = {
    data: null,
    availableUser: null,
    matches: null,
  };
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showMatch, setShowMatch] = useState(false);
  const [isLikingOrDisliking, setIsLikingOrDisliking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLike, setCurrentLike] = useState(null);
  const isMounted = useRef(false);

  useEffect(
    function updateLocalStorage() {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    [token]
  );

  useEffect(
    function fetchUserWhenMounted() {
      async function fetchUser() {
        if (token) {
          try {
            const { sub } = decode(token);
            FrienderApi.token = token;
            const user = await FrienderApi.getUser(sub);
            const matches = await FrienderApi.getMatches(user.id);
            const availableUser = await FrienderApi.getAvailableUser(user.id);
            setUser({
              data: user,
              availableUser: availableUser,
              matches: matches
            });
            setIsLoading(false);
          } catch (err) {
            resetUser();
          }
        } else {
          resetUser();
        }
      }
      fetchUser();
    },
    [token]
  );

  useEffect(
    function likeOrDislike() {
      if (isMounted.current) {
        setIsLoading(true);
        async function fetchAvailableUser() {
          try {
            setCurrentLike(user.availableUser);
            const nextAvailableUser = await FrienderApi.getAvailableUser(user.data.id);
            setUser((prev) => ({
              ...prev,
              availableUser: nextAvailableUser,
            }));
            setIsLoading(false);
          } catch (err) {
            // TODO:
          }
        }
        fetchAvailableUser();
      } else {
        isMounted.current = true;
      }
    },
    [isLikingOrDisliking]
  )

  /** Resets user to an initial state */
  function resetUser() {
    setUser({
      ...initialUser,
    });
    setIsLoading(false);
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
    const token = await FrienderApi.login(data);
    setIsLoading(true);
    setToken(token);
  }

  /** Logs user into application
   *
   * data: {email, password, firstName, lastName, location}
   */
  async function signup(data) {
    const token = await FrienderApi.signup(data);
    setIsLoading(true);
    setToken(token);
  }

  /** Edit user info
   *
   * data: {email, firstName, lastName, location, bio, radius}
   */
  async function editProfile(data) {
    const newUserData = await FrienderApi.editProfile(data, user.data.id);
    setUser((prev) => ({
      ...prev,
      data: newUserData,
    }));
    setIsLoading(true);
  }

  /** Likes a user and gets the next available user
   *
   * id: id of the user being liked
   */
  async function like(id) {
    setIsLikingOrDisliking((prev) => !prev);
    const res = await FrienderApi.likeUser(id);
    console.log('availableUser in like: ', user.availableUser)
    if (res.message === 'match') {
      setShowMatch(true);
      setUser((prev) => ({
        ...prev,
        matches: [...prev.matches, {...prev.availableUser}]
      }))
    }
    // const nextAvailableUser = await FrienderApi.getAvailableUser(user.data.id);
    // setUser((prev) => ({
    //   ...prev,
    //   availableUser: nextAvailableUser,
    // }));
  }

  /** Resets show match to false */
  function resetShowMatch() {
    setShowMatch(false);
  }

  /** Disikes a user and gets the next available user
   *
   * id: id of the user being disliked
   */
  async function dislike(id) {
    setIsLikingOrDisliking((prev) => !prev);
    await FrienderApi.dislikeUser(id);
    // const nextAvailableUser = await FrienderApi.getAvailableUser(user.data.id);
    // setUser((prev) => ({
    //   ...prev,
    //   availableUser: nextAvailableUser,
    // }));
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
        ...prev.data,
        imageUrl: res.imageUrl
      }
    }));
  }

  if (isLoading) return <Loader />;

  /** Edits a user's profile information and updates across app
   *
   * data: {email, password, firstName, lastName, location, bio, radius}
   */

  return (
    <div className='App'>
      {console.log(user.matches)}
      <userContext.Provider value={{ user: user.data }}>
        <BrowserRouter>
          {user.data && <NavBar logout={logout} />}
          <RoutesList
            login={login}
            signup={signup}
            uploadPicture={uploadPicture}
            editProfile={editProfile}
            like={like}
            dislike={dislike}
            showMatch={showMatch}
            availableUser={user.availableUser}
            resetShowMatch={resetShowMatch}
            matches={user.matches}
            currentLike={currentLike}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
