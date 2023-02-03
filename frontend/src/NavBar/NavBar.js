import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./NavBar.scss";
import logo from "../assets/friender-icon.svg";
import { NavLink, Link } from "react-router-dom";

/** NavBar: Renders navbar
 *
 * Props:
 * - logout: function to log user out in parent
 *
 * App -> NavBar
 */

function NavBar({ logout }) {
  return (
    <Navbar variant="transparent" expand="lg">
      <Container fluid>
        <Nav>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">

            <NavLink className="nav-link" to="/">
              Get Matching
            </NavLink>
            <NavLink className="nav-link" to="/matches">
              My Matches
            </NavLink>
            <NavLink className="nav-link" to="/edit-profile">
              Profile
            </NavLink>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
