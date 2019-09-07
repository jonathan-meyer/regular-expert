import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Container,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
import axios from "axios";
import banner from "../assets/home.jpg"

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    newUser: null
  };

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ newUser: true });
    let user = this.state;
    console.log("user", user);

    axios
      .post("/auth/", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  bannerStyle = {
    width: "100%",
    marginBottom: "50px"
  };

  inputText = {
    fontWeight: "bold"
  };

  render() {
    return (
      <>
        <Container style={this.bannerStyle}>
          <div className='banner'>
            <img src={banner} style={this.bannerStyle} alt='banner'></img>
          </div>
          <div className='Signup'>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId='firstName'>
                <FormLabel style={this.inputText}>First Name</FormLabel>
                <FormControl
                  autoFocus
                  type='firstName'
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  autoComplete='off'
                />
              </FormGroup>
              <FormGroup controlId='lastName'>
                <FormLabel style={this.inputText}>Last Name</FormLabel>
                <FormControl
                  autoFocus
                  type='lastName'
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  autoComplete='off'
                />
              </FormGroup>
              <FormGroup controlId='username'>
                <FormLabel style={this.inputText}>Username</FormLabel>
                <FormControl
                  autoFocus
                  type='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                  autoComplete='off'
                />
              </FormGroup>
              <FormGroup controlId='password'>
                <FormLabel style={this.inputText}>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type='password'
                  autoComplete='off'
                />
              </FormGroup>
              <FormGroup controlId='confirmPassword'>
                <FormLabel style={this.inputText}>Confirm Password</FormLabel>
                <FormControl
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type='password'
                  autoComplete='off'
                />
              </FormGroup>
              <Button
                variant='success'
                disabled={!this.validateForm()}
                type='submit'
                text='Signup'
                loadingtext='Signing up…'
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </Container>
      </>
    );
  }
}

export default SignUp;
