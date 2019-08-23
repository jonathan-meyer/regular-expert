import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Container from '../components/Container';
import SearchForm from '../components/SearchForm';

class Landing extends Component {
  state = {
    location: '',
    message: "Hey, this is the landing page!"
  };

  handleInputChange = event => {
    const { location, value } = event.target;
    this.setState({
      [location]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    // this.getHomes();
    console.log(this.state.location);
  };


  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <h1>{this.state.message}</h1>
          <SearchForm
           handleFormSubmit={this.handleFormSubmit}
           handleInputChange={this.handleInputChange}
           location={this.state.location}
          />
        </Container>
      </div>
    );
  }
}

export default Landing;
