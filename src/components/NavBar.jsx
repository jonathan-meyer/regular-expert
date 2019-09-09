import React from "react";
import { Link } from "react-router-dom";

import Emoji from "@stej/emoji";
import axios from "axios";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const menu = [
  { label: "Home", link: "/", login: false },
  { label: "Group Management", link: "/groups" },
  { label: "Create A Group", link: "/group/create" }
];

class NavBar extends React.Component {
  state = { validated: false };

  handleLogin(e, updateUser) {
    e.preventDefault();

    if (e.target.checkValidity()) {
      const form = e.target;
      const data = new FormData(form);
      const username = data.get("username");
      const password = data.get("password");

      axios
        .post("/auth/login", { username, password })
        .then(res => res.data)
        .then(data => {
          updateUser(data);
          form.reset();
        })
        .catch(err => {
          console.log({ err });
          updateUser(null);
          form.reset();
          alert("Bad Username and Password");
        });
    }

    this.setState({ validated: true });
  }

  handleLogout(e, updateUser) {
    axios
      .post("/auth/logout")
      .then(res => res.data)
      .then(data => {
        console.log(data);
        updateUser(null);
      })
      .catch(err => console.log({ err }));
  }

  render() {
    const { user, updateUser } = this.props;
    const { validated } = this.state;

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
                  <Nav.Link
                    as={Button}
                    onClick={e => this.handleLogout(e, updateUser)}
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
                    noValidate
                    validated={validated}
                    className="m-2"
                    style={{ width: "300px" }}
                    onSubmit={e => this.handleLogin(e, updateUser)}
                  >
                    <Form.Group>
                      <h5>Username:</h5>
                      <Form.Control
                        required
                        name="username"
                        type="text"
                        placeholder="Username"
                      />
                    </Form.Group>
                    <Form.Group>
                      <h5>Password:</h5>
                      <Form.Control
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <ButtonToolbar className="float-right">
                        <Button className="mx-1" as={Link} to="/sign-up">
                          <Emoji>Register :memo:</Emoji>
                        </Button>
                        <Button className="mx-1" type="submit">
                          <Emoji>Login :sunglasses:</Emoji>
                        </Button>
                      </ButtonToolbar>
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
}

export default NavBar;
