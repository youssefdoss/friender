import { Container } from "react-bootstrap";
import MatchCard from "./MatchCard";
import { Link, useNavigate } from "react-router-dom";

function MatchList({ matches }) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>My Matches</h1>
      <div className="row">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      {matches.length === 0 && (
        <p className="mt-4">
          You don’t have any matches yet, <Link to="/">go make some friends</Link>.
        </p>
      )}
    </Container>
  );
}

export default MatchList;
