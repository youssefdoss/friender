import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import './NavBar.css';

/** NavBar: Renders navbar
 *
 * Props:
 * - logout: function to log user out in parent
 *
 * App -> NavBar
 */

function NavBar({ logout }) {
  return (
    <Navbar
      style={{position: 'sticky', top: 0, zIndex: 10}}
      bg="light"
      variant="light"
      className="nav px-3"
    >
      <Container>
        <Navbar.Brand href='/'>
          Friender
        </Navbar.Brand>
      </Container>
      <Nav className="justify-content-end">
        <Nav.Link href='/matches'>Matches</Nav.Link>
        <Nav.Link href='/edit-profile'>Profile</Nav.Link>
        <Nav.Link onClick={logout}>Log Out</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavBar;