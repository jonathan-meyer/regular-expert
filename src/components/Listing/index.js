import React, { Component } from 'react';

import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";

class Listing extends Component {

  render() {
    const { photo, address, price, beds, baths, sqft, property_id, listing_id } = this.props;
    return (
    <>
    <ListGroup.Item>
      <Image src={photo} thumbnail width={240} className="float-left m-1" />
      <h5 style={{fontStyle:'italic'}}>{address}</h5>
      <p>{price}</p>
      <p>{beds} beds | {baths} baths | {sqft}</p>
      <Button
        variant="primary"
        as={Nav}
        to={`/api/share/${listing_id}/${property_id}`}>Share this Home</Button>
    </ListGroup.Item>
    </>);
  }
}
 
export default Listing;