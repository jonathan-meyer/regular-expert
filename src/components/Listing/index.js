import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

export default function({ photo, address, price, beds, baths, sqft, property_id, listing_id }) {
  return (
    <ListGroup.Item>
      <Image src={photo} thumbnail width={240} className="float-left m-1" />
      <h5 style={{fontStyle:'italic'}}>{address}</h5>
      <p>{price}</p>
      <p>{beds} beds | {baths} baths | {sqft}</p>
      <Button
        id='shareHome'
        variant="primary">Share this Home</Button>
    </ListGroup.Item>
  );
}
