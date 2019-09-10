import React, { Component } from "react";
import axios from "axios";

import DropdownList from "react-widgets/lib/DropdownList";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ListingFull from "../components/ListingFull";
import ListingSummary from "../components/ListingSummary";
import Json from "../components/Json";
import { Image } from "react-bootstrap";

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

    const { group, listing } = this.state;
    const data = { listing: listing._id };

    console.log({ data });

    axios
      .put(`/api/listing/${group._id}`, data)
      .then(res => res.data)
      .then(data => {
        console.log({ data });
      })
      .catch(err => {
        console.log({ err });
      });
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleDropdownListChange(group) {
    this.setState({ group });
  }

  getListing() {
    const { error, listing, fetchingListing } = this.state;
    const { match } = this.props;
    const { id } = match.params;

    if (!error && !fetchingListing && !listing && id) {
      axios
        .get(`/api/listing/${id}`)
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingListing: false, listing: data });
        })
        .catch(error => {
          this.setState({ error, fetchingListing: false, listing: null });
          console.log(error);
        });
    }
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

  componentDidMount() {
    this.getListing();
    this.getGroups();
  }

  render() {
    const { group, groups, listing, fetchingGroup } = this.state;
    const { match, user } = this.props;

    return (
      <div
        className="shareHome"
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          marginBottom: "100px"
        }}
      >
        {listing && <Image src={listing.mls.photo.href} thumbnail></Image>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="groups">
            <Form.Label>Select a Group:</Form.Label>
            <DropdownList
              id="group"
              textField="name"
              valueField="_id"
              value={group.name}
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
            Add To Group.
          </Button>
        </Form>
        <Json title="group">{group}</Json>
      </div>
    );
  }
}

export default ShareListing;
