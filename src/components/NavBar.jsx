import React from "react";
import { Link } from "react-router-dom";

import Emoji from "@stej/emoji";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import LoginForm from "../components/LoginForm";

const menu = [
  { label: "Home", link: "/", login: false },
  { label: "Group Management", link: "/groups" },
  { label: "Create A Group", link: "/group/create" }
];

class NavBar extends React.Component {
  render() {
    const { user, updateuser } = this.props;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Emoji>:house_with_garden: LFHT</Emoji>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {menu.map(
                (item, key) =>
                  (user || item.login === false) && (
                    <Nav.Link key={key} as={Link} to={item.link}>
                      {item.label}
                    </Nav.Link>
                  )
              )}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/logout">
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
                  <LoginForm user={user} updateuser={updateuser} />
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
