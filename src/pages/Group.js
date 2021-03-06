import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListingSummary from "../components/ListingSummary";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      listings: []
    };
  }

  componentDidUpdate() {
    const {
      error,
      group,
      fetchingGroup,
      fetchingListing,
      listings
    } = this.state;
    const { match, user } = this.props;

    console.log("componentDidUpdate");

    if (!error && user && !fetchingGroup && !group.name && match.params.id) {
      this.setState({ fetchingGroup: true });

      axios
        .get(`/api/group/${match.params.id}`, {
          params: { populate: ["users"] }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, group: data });
        })
        .catch(error => {
          this.setState({ error, fetchingGroup: false, group: {} });
          console.log(error);
        });
    }

    if (
      !error &&
      user &&
      !fetchingListing &&
      listings.length === 0 &&
      match.params.id
    ) {
      axios
        .get(`/api/listing/group/${match.params.id}`)
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingListing: false, listings: data });
        })
        .catch(error => {
          this.setState({ error, fetchingListing: false, listings: [] });
          console.log(error);
        });
    }
  }

  render() {
    const { listings } = this.state;

    return (
      <Card>
        <div>The Chosen Listings</div>
        <ListGroup>
          {listings.map((listing, key) => (
            <ListGroup.Item key={key}>
              <ListingSummary
                photo={listing.mls.photo && listing.mls.photo.href}
                address={listing.address}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    );
  }
}

export default Group;
