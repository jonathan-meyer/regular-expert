import React from "react";
import axios from "axios";

import Spinner from "react-bootstrap/Spinner";

import ListingFull from "../components/ListingFull";

class ViewListing extends React.Component {
  state = {};

  getListing() {
    const { error, listing, fetchingListing } = this.state;
    const { match } = this.props;
    const { property_id, listing_id } = match.params;

    if (!error && !fetchingListing && !listing) {
      console.log("getting listing from db");

      this.setState({ fetchingListing: true });

      axios
        .get(`/api/listing/${property_id}/${listing_id}`)
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

  componentDidMount() {
    this.getListing();
  }

  componentDidUpdate() {
    this.getListing();
  }

  render() {
    const { listing, fetchingListing } = this.state;
    const { user } = this.props;

    return (
      <div className="content">
        {fetchingListing && <Spinner animation="border" />}
        <ListingFull user={user} listing={listing} />
      </div>
    );
  }
}

export default ViewListing;
