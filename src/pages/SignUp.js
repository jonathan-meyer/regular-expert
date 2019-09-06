import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
import axios from "axios";

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

  render() {
    return (
      <div className='Signup'>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId='firstName'>
            <FormLabel>First Name</FormLabel>
            <FormControl
              autoFocus
              type='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup controlId='lastName'>
            <FormLabel>Last Name</FormLabel>
            <FormControl
              autoFocus
              type='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup controlId='username'>
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type='username'
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup controlId='confirmPassword'>
            <FormLabel>Confirm Password</FormLabel>
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
    );
  }
}

export default SignUp;
