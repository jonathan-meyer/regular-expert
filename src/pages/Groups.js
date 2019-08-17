import React, { Component } from "react";

class Groups extends Component {
  state = {
   message: "Hey, this is the groups page!"
  };


  render() {
    return (
        <h1>{this.state.message}</h1>
    );
  }
}

export default Groups;