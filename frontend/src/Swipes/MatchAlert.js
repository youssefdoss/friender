import { Link } from "react-router-dom";
import "./MatchAlert.scss"
import logo from "../assets/friender-logo.svg";

/** MatchAlert: Renders match alert when needed
 *
 * Props:
 * - match: Object containing match user
 * - closeModal: function to close the match modal
 *
 * AvailableUser -> MatchAlert
 */
function MatchAlert({ match, closeModal }) {
  return (
    <div className="MatchAlert">
      <img src={logo} alt="friender logo"/>
      <p>You've matched with {match.firstName}!</p>
      <div>
        <Link to={`/profile/${match.id}`} className="btn btn-sm btn-primary me-2">Go to profile</Link>
        <button onClick={closeModal} className="btn btn-sm btn-outline-primary">Continue swiping</button>
      </div>
    </div>
  );
}

export default MatchAlert;
