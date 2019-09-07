import React, { Component } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import banner from "../assets/college.jpg";

import Multiselect from "react-widgets/lib/Multiselect";

class Groups extends Component {
  state = {};

  handleSubmit(e) {
    e.preventDefault();
    console.log(Array.from(new FormData(e.target).entries()));
  }

  handleUserListChange(e) {}

  componentDidMount() {
    const { group } = this.state;
    const { match } = this.props;

    if (!group) {
      axios
        .get(`/api/group/${match.params.id}`, {
          params: { populate: ["users"] }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ group: data });
        })
        .catch(err => {
          this.setState({ group: undefined });
          console.log(err);
        });
    }
  }

  bannerStyle = {
    width: "100%",
    marginBottom: "50px"
  };

  inputText = {
    fontWeight: "bold"
  };

  render() {
    const { group, users } = this.state;
    const { match } = this.props;

    return (
      <Card>
        <div className='banner'>
          <img src={banner} style={this.bannerStyle} alt='banner'></img>
        </div>
        <Card.Body>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Group controlId='name'>
              <Form.Label style={this.inputText}>Name:</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label style={this.inputText}>Description:</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group controlId='members'>
              <Multiselect
                name='users'
                data={[]}
                value={
                  group &&
                  group.users.map(user => ({
                    text: user.username,
                    value: user._id
                  }))
                }
                onChange={e => this.handleUserListChange(e)}
              ></Multiselect>
            </Form.Group>
            <Button onClick={() => {}}>Save</Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <pre>{JSON.stringify(group, null, 2)}</pre>
        </Card.Footer>
      </Card>
    );
  }
}

export default Groups;
