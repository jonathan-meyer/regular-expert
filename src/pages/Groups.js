import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

class Groups extends Component {
  state = { groups: [], fetching: false };

  getGroups() {
    const { error, fetching, groups } = this.state;

    if (!error && !fetching && groups.length === 0) {
      axios
        .get("/api/group/mine")
        .then(res => res.data)
        .then(groups => {
          this.setState({ groups });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  componentDidUpdate() {
    this.getGroups();
  }

  componentDidMount() {
    this.getGroups();
  }
  
  render() {
    const { groups } = this.state;

    return (
      <div className="content">
        <Container>
          <h1>Your Groups</h1>
          <br></br>

          <Table striped bordered hover width="100%">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Last Collaboration Date</th>
                <th># of Collaborators</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, key) => (
                <tr key={key}>
                  <td>{group.name}</td>
                  <td>{moment(group.created).calendar()}</td>
                  <td>{group.users.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Groups;
