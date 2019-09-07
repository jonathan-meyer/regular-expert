import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

export default function({ photo, address }) {
  return (
    <ListGroup.Item>
      <Image src={photo} thumbnail width={240} className="float-left m-1" />
      <p>{address}</p>
    </ListGroup.Item>
  );
}
