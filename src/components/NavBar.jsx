import React from "react";
import { Link } from "react-router-dom";

import Emoji from "@stej/emoji";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const handelLogin = e => {
  e.preventDefault();
};

function NavBar({ user }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Emoji>:house_with_garden: LFHT</Emoji>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/groups">
              Groups
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  {user}
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title="Login"
                id="collasible-nav-dropdown"
                alignRight={true}
              >
                <Form
                  className="m-2"
                  style={{ width: "300px" }}
                  onSubmit={e => handelLogin(e)}
                >
                  <Form.Group>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button className="float-right" type="submit" size="sm">
                      Login
                    </Button>
                  </Form.Group>
                </Form>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
