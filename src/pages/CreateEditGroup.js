import React, { Component } from "react";
import axios from "axios";

import Multiselect from "react-widgets/lib/Multiselect";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import banner from "../assets/college.jpg";

class CreateEditGroup extends Component {
  state = {
    form: {
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
    const { form } = this.state;

    this.setState({ form: { ...form, [id]: value } });
  }

  handleMultiSelectChange(members) {
    const { form } = this.state;

    this.setState({ form: { ...form, members } });
  }

  handleClick(e) {
    const { user } = this.props;
    const { form } = this.state;

    const group = {
      name: form.name,
      description: form.description,
      owner: user._id,
      users: form.members.map(member => member._id)
    };

    console.log({ group });

    axios
      .post("/api/group", group)
      .then(res => res.data)
      .then(data => {
        console.log({ data });
      })
      .catch(err => {
        console.log({ err });
      });
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

  getGroup() {
    const { group, fetchingGroup } = this.state;
    const { match } = this.props;

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
    // this.getGroup();
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
    const { form, users, fetchingUsers } = this.state;

    return (
      <Container>
        {!user && <Alert variant="danger">Need to login first</Alert>}
        <div className="banner">
          <img src={banner} style={this.bannerStyle} alt="banner"></img>
        </div>
        <div className="content">
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={form.name}
                onChange={e => this.handleChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={form.description}
                onChange={e => this.handleChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="members">
              <Form.Label>Members:</Form.Label>
              <Multiselect
                id="members"
                textField={i => `${i.firstName} ${i.lastName}`}
                valueField="_id"
                value={form.members}
                onChange={items => this.handleMultiSelectChange(items)}
                data={users}
                busy={fetchingUsers}
              ></Multiselect>
            </Form.Group>
            <Button variant="success" onClick={e => this.handleClick(e)}>
              Save
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default CreateEditGroup;
