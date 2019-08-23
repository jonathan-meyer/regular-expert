import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";

class Landing extends Component {
  state = {
    location: "",
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
        <div className='container'>
          <h1>{this.state.message}</h1>
          <SearchForm
            location={this.state.location}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
