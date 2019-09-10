import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Json from "../components/Json";
import Listing from "../components/Listing";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      listings: []
    };
  }

  componentDidUpdate() {
    const { group, fetchingGroup, fetchingListing, listings } = this.state;
    const { match, user } = this.props;

    console.log("componentDidUpdate");

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
    if (user && !fetchingListing && listings.length === 0 && match.params.id) {
      axios
        .get(`/api/listing/group/${match.params.id}`)
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingListing: false, listings: data });
        })
        .catch(err => {
          this.setState({ fetchingListing: false, listings: [] });
          console.log(err);
        });
    }
  }
  render() {
    const { group, listings } = this.state;
    return (
      <Card>
        <div>The Chosen Listings</div>
        <ListGroup>
          {this.state.listings.map((listing, key) => (
            <Listing
              key={key}
              photo={listing.mls.photo && listing.mls.photo.href}
              address={listing.address}
            />
          ))}
        </ListGroup>
        
      </Card>
    );
  }
}

export default Group;
