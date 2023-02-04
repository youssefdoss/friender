import { Container } from "react-bootstrap";
import MatchCard from "./MatchCard";
import { Link } from "react-router-dom";

/** MatchList: Renders the match list component
 *
 * Props:
 * - matches: Array of match objects
 *
 * RoutesList -> MatchList -> MatchCard
 */

function MatchList({ matches }) {

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
