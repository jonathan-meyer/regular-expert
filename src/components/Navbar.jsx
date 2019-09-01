import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link className="navbar-brand" as={Link} to="/">
          LFHT
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/home">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/groups">
          Groups
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
