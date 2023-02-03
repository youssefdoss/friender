import { Link } from "react-router-dom";
import { XCircle } from "react-bootstrap-icons";
import "./MatchAlert.scss"
/**
 * MatchAlert
 * TODO:
 */
function MatchAlert({ match, viewProfile, closeModal }) {
  return (
    <div className="MatchAlert">
      <button onClick={closeModal} className="btn btn-primary btn-exit"><XCircle/></button>
      <p>You've matched with {match.firstName}!</p>
      <Link to={`/profile/${match.id}`} className="btn btn-primary">Go to profile</Link>
    </div>
  );
}

export default MatchAlert;
