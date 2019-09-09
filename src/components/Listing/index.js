import React, { Component } from 'react';

import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: this.props.property_id,
      listing_id: this.props.listing_id,
      user: this.props.user
    };
  }

  render() { 
    return (
    <>
    <ListGroup.Item>
      <Image src={this.props.photo} thumbnail width={240} className="float-left m-1" />
      <h5 style={{fontStyle:'italic'}}>{this.props.address}</h5>
      <p>{this.props.price}</p>
      <p>{this.props.beds} beds | {this.props.baths} baths | {this.props.sqft}</p>
      <Button
        id='shareHome'
        variant="primary"
        onClick={this.props}>Share this Home</Button>
    </ListGroup.Item>
    </>);
  }
}
 
export default Listing;