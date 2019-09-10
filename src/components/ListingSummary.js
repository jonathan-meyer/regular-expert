import React, { Component } from "react";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class ListingSummary extends Component {
  render() {
    const {
      photo,
      address,
      price,
      beds,
      baths,
      sqft,
      property_id,
      listing_id
    } = this.props;
    return (
      <>
        <Image src={photo} thumbnail width={240} className="float-left m-1" />
        <h5 style={{ fontStyle: "italic" }}>{address}</h5>
        <p>{price}</p>
        <p>
          {beds} beds | {baths} baths | {sqft}
        </p>
        {
          <Button as={Link} to={`/listing/${property_id}/${listing_id}`}>
            View
          </Button>
        }
      </>
    );
  }
}

export default ListingSummary;
