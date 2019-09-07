import React, { Component } from "react";
import axios from "axios";

import Multiselect from "react-widgets/lib/Multiselect";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Json from "../components/Json";

import banner from "../assets/college.jpg";

class CreateGroup extends Component {
  state = {
    group: {
      name: "",
      description: "",
      members: []
    },
    users: [],
    fetchingUsers: false,
    fetchingGroup: false
  };

  handleChange(e) {
    const { id, value } = e.target;
    const { group } = this.state;

    this.setState({ group: { ...group, [id]: value } });
  }

  handleMultiSelectChange(members) {
    const { group } = this.state;

    this.setState({ group: { ...group, members } });
  }

  handleClick(e) {
    console.log(this.state.group);
  }

  getUsers() {
    const { users, fetchingUsers } = this.state;
    const { user } = this.props;

    if (user && !fetchingUsers && users.length === 0) {
      console.log("getting users");

      this.setState({ fetchingUsers: true });

      axios
        .get("/api/user/list")
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingUsers: false, users: data });
          console.log({ users: data });
        })
        .catch(err => {
          this.setState({ fetchingUsers: false, users: [] });
          console.log(err);
        });
    }
  }

  componentDidMount() {
    const { group, fetchingGroup } = this.state;
    const { match } = this.props;

    console.log("componentDidMount");

    if (!fetchingGroup && !group.name && match.params.id) {
      this.setState({ fetchingGroup: true });

      axios
        .get(`/api/group/${match.params.id}`, {
          params: { populate: ["users"] }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, group: data });
        })
        .catch(err => {
          this.setState({ fetchingGroup: false, group: {} });
          console.log(err);
        });
    }
  }

  componentDidUpdate() {
    this.getUsers();
  }

  bannerStyle = {
    width: "100%",
    marginBottom: "50px"
  };

  inputText = {
    fontWeight: "bold"
  };

  render() {
    const { user } = this.props;
    const { group, users, fetchingUsers } = this.state;

    return (
      <Container>
        {user ? (
          <>
            <div className="banner">
              <img src={banner} style={this.bannerStyle} alt="banner"></img>
            </div>
            <div>
              <Form onSubmit={e => e.preventDefault()}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    value={group.name}
                    onChange={e => this.handleChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    value={group.description}
                    onChange={e => this.handleChange(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="members">
                  <Form.Label>Members:</Form.Label>
                  <Multiselect
                    id="members"
                    textField={i => `${i.firstName} ${i.lastName}`}
                    valueField="_id"
                    value={group.members}
                    onChange={items => this.handleMultiSelectChange(items)}
                    data={users}
                    busy={fetchingUsers}
                  ></Multiselect>
                </Form.Group>
                <Button onClick={e => this.handleClick(e)}>Save</Button>
              </Form>
            </div>
          </>
        ) : (
          <Alert variant="danger">Need to login first</Alert>
        )}
        <Alert variant="info">
          Debug:
          <Json title="user">{user}</Json>
          <Json title="group">{group}</Json>
        </Alert>
      </Container>
    );
  }
}

export default CreateGroup;
