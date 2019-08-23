import React, { Component } from "react";

class Home extends Component {
  state = {
   message: "Hey, this is the home page!"
  };


  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}

export default Home;