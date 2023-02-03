import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MatchCard.scss"
/**
 * MatchCard
 */
function MatchCard({match}){
  return(
    <Link to={`/profile/${match.id}`}>
      <Card className="MatchCard col-6 col-2">
        <img src={match.imageUrl} alt={`${match.firstName} profile`}/>
        <h3 className="mt-3">{match.firstName}</h3>
      </Card>
    </Link>
  )
}

export default MatchCard;