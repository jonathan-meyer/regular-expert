import React, { Component } from "react";

class Landing extends Component {
  state = {
   message: "Hey, this is the landing page!"
  };


  render() {
    return (
        <h1>{this.state.message}</h1>
    );
  }
}

export default Landing;