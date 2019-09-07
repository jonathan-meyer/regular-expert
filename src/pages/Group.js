import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Json from "../components/Json";
import Listing from "../components/Listing";

class Group extends Component {
  state = {
    group: {},
    listing: [],
    listGroup: [
      {
        photo: "http://www.google.com/image",
        address: "1600 Pennsylvania ave, Washington DC, 06660"
      },
      {
        photo: "http://www.google.com/image",
        address: "1600 Pennsylvania ave, Washington DC, 06660"
      }
    ]
  };

  componentDidUpdate() {
    const { group, fetchingGroup, fetchingListing, listing } = this.state;
    const { match, user } = this.props;

    console.log("componentDidMount");

    if (user && !fetchingGroup && !group.name && match.params.id) {
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
    if (user && !fetchingListing && listing.length === 0 && match.params.id) {
      axios
        .get(`/api/listing/`, {
          params: { group: match.params.id }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingListing: false, listing: data });
        })
        .catch(err => {
          this.setState({ fetchingListing: false, listing: [] });
          console.log(err);
        });
    }
  }
  render() {
    const { group, listing } = this.state;
    return (
      <Card>
        <div>The Chosen Listings</div>
        <ListGroup>
          {this.state.listing.map(listGroup => (
            <Listing
              photo={listGroup.photo}
              address={listGroup.address}
            ></Listing>
          ))}
        </ListGroup>
        <Json>{group}</Json>
        <Json>{listing}</Json>
      </Card>
    );
  }
}

export default Group;
