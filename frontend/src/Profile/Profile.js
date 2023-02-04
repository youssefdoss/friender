import { useParams } from "react-router-dom"
import UserCard from "../Swipes/UserCard"
/** Profile: Renders profile patch
 *
 * Props:
 * - matches: Array of match objects
 *
 * RoutesList -> Profile -> UserCard
 */
function Profile({matches}) {
  const { id } = useParams()

  const match = matches.filter(match => +id === match.id)[0]
  return (
    <UserCard user={match}/>
  )
}


export default Profile