import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Emoji from "@stej/emoji";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class LoginForm extends Component {
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

  render() {
    const { validated } = this.state;
    const { updateuser, ...props } = this.props;

    return (
      <div {...props}>
        <Form
          noValidate
          className="p-2"
          validated={validated}
          style={{ width: "300px" }}
          onSubmit={e => this.handleLogin(e, updateuser)}
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
            <ButtonToolbar className="d-flex justify-content-around">
              <Button className="mx-1" as={Link} to="/sign-up">
                <Emoji>Register :memo:</Emoji>
              </Button>
              <Button className="mx-1" type="submit">
                <Emoji>Login :sunglasses:</Emoji>
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
