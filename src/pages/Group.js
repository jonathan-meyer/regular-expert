import React, { Component } from "react";

class Group extends Component {
  state = {
   message: "Hey, this is the individual group/collaboration page!"
  };


  render() {
    return (
        <h1>{this.state.message}</h1>
    );
  }
}

export default Group;