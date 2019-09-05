import React, { Component } from "react";

class Groups extends Component {
  render() {
    const { user, group } = this.props;
    return (
      <>
        <h1>Groups</h1>
        <div>
          User: <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        <div>Group: {group}</div>
      </>
    );
  }
}

export default Groups;
