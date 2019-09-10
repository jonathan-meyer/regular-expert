import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import LoginForm from "../components/LoginForm";

class Auth extends React.Component {
  state = { redirect: false };

  componentDidMount() {
    console.log("componentDidMount");
    this.go();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.go();
  }

  go() {
    const { user, updateuser, login, logout } = this.props;

    if (login && user) {
      this.setState({ redirect: true });
    }

    if (logout && user && updateuser) {
      axios
        .post("/auth/logout")
        .then(res => res.data)
        .then(data => {
          updateuser(null);
          this.setState({ redirect: true });
        })
        .catch(err => {
          console.log({ err });
          updateuser(null);
          this.setState({ redirect: true });
        });
    }
  }

  render() {
    const { user, updateuser, login, logout } = this.props;
    const { redirect } = this.state;

    return (
      <Container className="vh-100">
        <div className="d-flex d-inline-block justify-content-center align-items-center h-50">
          {!user && login && (
            <LoginForm
              user={user}
              updateuser={updateuser}
              className="border rounded"
            />
          )}
          {user && logout && <Alert variant="success">Logged out!</Alert>}
          {redirect && <Redirect to="/" />}
        </div>
      </Container>
    );
  }
}

export default Auth;
