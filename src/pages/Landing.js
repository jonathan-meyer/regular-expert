import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import API from "../utils/API";

class Landing extends Component {
  state = {
    location: "Portsmouth, NH",
    message: "Hey, this is the landing page!"
  };

  handleInputChange = event => {
    this.setState({ location: event.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const lctn = this.state.location;
    API.searchListings(lctn).then(res => { console.log(res) });
    console.log(lctn);
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
