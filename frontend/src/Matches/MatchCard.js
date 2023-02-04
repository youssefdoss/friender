import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MatchCard.scss";
/** MatchCard: Renders a single match card
 *
 * Props:
 * - match: Object of a match user
 *
 * MatchList -> MatchCard
 */
function MatchCard({ match }) {
  return (
    <Card className="MatchCard col-6 col-2">
      <Link to={`/profile/${match.id}`}>
        <img src={match.imageUrl} alt={`${match.firstName} profile`} />
        <h4 className="mt-3">{match.firstName}</h4>
      </Link>
    </Card>
  );
}

export default MatchCard;
