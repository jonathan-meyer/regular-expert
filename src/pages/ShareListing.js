import React, { Component } from "react";
import axios from "axios";

import DropdownList from "react-widgets/lib/DropdownList";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ListingFull from "../components/ListingFull";
import Json from "../components/Json";

class ShareListing extends Component {
  state = {
    group: {},
    groups: [],
    listing: null,
    fetchingGroup: false,
    fetchingListing: false
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted!");
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleDropdownListChange(group) {
    this.setState({ group });
  }

  getGroups() {
    const { error, groups, fetchingGroup } = this.state;

    if (!error && !fetchingGroup && groups.length === 0) {
      console.log("getting groups");

      this.setState({ fetchingGroup: true });

      axios
        .get("/api/group/mine")
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, groups: data });
          console.log({ groups: data });
        })
        .catch(error => {
          this.setState({ error, fetchingGroup: false, groups: [] });
          console.log(error);
        });
    }
  }

  componentDidUpdate() {
    this.getListing();
    this.getGroups();
  }

  render() {
    const { group, groups, listing, fetchingGroup } = this.state;
    const { match } = this.props;

    return (
      <div
        className="shareHome"
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          marginBottom: "100px"
        }}
      >
        <ListingFull {...listing} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="groups">
            <Form.Label>Select a Group:</Form.Label>
            <DropdownList
              id="group"
              textField={i => i.name}
              valueField="_id"
              value={group}
              onChange={items => this.handleDropdownListChange(items)}
              data={groups}
              busy={fetchingGroup}
            ></DropdownList>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            onClick={e => this.handleSubmit(e)}
          >
            Start Collaborating!
          </Button>
        </Form>
        <Json title="match">{match}</Json>
        <Json title="state">{this.state}</Json>
      </div>
    );
  }
}

export default ShareListing;
