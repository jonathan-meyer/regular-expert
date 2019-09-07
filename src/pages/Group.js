import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Listing from "../components/Listing";

class Group extends Component {
  state = {
    listGroup:[
      {
        photo: 'http://www.google.com/image',
        address:"1600 Pennsylvania ave, Washington DC, 06660"
      },
      {
        photo: 'http://www.google.com/image',
        address:"1600 Pennsylvania ave, Washington DC, 06660"
      }
    ]
  };

  render() {
    return (
      <Card>
        <div>The Chosen Listings</div>
        <ListGroup>
          {this.state.listGroup.map(listGroup => (
            <Listing
              photo={listGroup.photo}
              address={listGroup.address}
            ></Listing>
          ))}
        </ListGroup>
      </Card>
    );
  }
}

export default Group;
