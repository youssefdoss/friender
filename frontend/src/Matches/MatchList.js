import { Container } from "react-bootstrap";
import MatchCard from "./MatchCard";

function MatchList({matches}) {
  return(
    <Container>
      <div className="row">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </Container>
  )
}

export default MatchList