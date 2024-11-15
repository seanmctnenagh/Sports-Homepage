import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  return (
    <Navbar expand="sm" className="bg-success" sticky="top">
      <Container>
        <Nav className="me-auto">
          {/* <Nav.Link as={Link} to="/timeline">
            <b>Timeline</b>
          </Nav.Link> */}

          <Nav.Link as={Link} to="/nextWeek">
            <b>Next Week</b>
          </Nav.Link>
          <Nav.Link as={Link} to="/last3Days">
            <b>Last 3 Days</b>
          </Nav.Link>
          
          <Nav.Link as={Link} to="/NhlPast">
            <b>NHL Past</b>
          </Nav.Link>
          
          <Nav.Link as={Link} to="/NhlFuture">
            <b>NHL Future</b>
          </Nav.Link>
          
          <Nav.Link as={Link} to="/nbaPast">
            <b>NBA Past</b>
          </Nav.Link>
          
          <Nav.Link as={Link} to="/nbaFuture">
            <b>NBA Future</b>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
