import React from "react";
import { Link } from "react-router-dom";

import Emoji from "@stej/emoji";
import axios from "axios";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const menu = [
  { label: "Home", link: "/" },
  { label: "Groups", link: "/groups" },
  { label: "Group", link: "/group" },
  { label: "Create A Group", link: "/group/create" },
  { label: "Sign Up", link: "/sign-up" }
];

const handleLogin = (e, updateUser) => {
  e.preventDefault();

  const data = new FormData(e.target);

  axios
    .post("/auth/login", {
      username: data.get("username"),
      password: data.get("password")
    })
    .then(res => res.data)
    .then(data => {
      console.log(data);
      updateUser(data);
    })
    .catch(err => console.log({ err }));
};

const handleLogout = (e, updateUser) => {
  axios
    .post("/auth/logout")
    .then(res => res.data)
    .then(data => {
      console.log(data);
      updateUser(null);
    })
    .catch(err => console.log({ err }));
};

function NavBar({ user, updateUser }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Emoji>:house_with_garden: LFHT</Emoji>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {menu.map((item, key) => (
              <Nav.Link key={key} as={Link} to={item.link}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link
                  as={Button}
                  onClick={e => handleLogout(e, updateUser)}
                  variant="link"
                >
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  {user.firstName} {user.lastName}
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
                  onSubmit={e => handleLogin(e, updateUser)}
                >
                  <Form.Group>
                    <h5>Username:</h5>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
                  </Form.Group>
                  <Form.Group>
                  <h5>Password:</h5>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button className="float-right" type="submit" size="sm">
                      <Emoji>Login :sunglasses:</Emoji>
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
