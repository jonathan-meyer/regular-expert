import React, { Component } from "react";

import Listing from "../components/Listing";
import ListGroup from "react-bootstrap";

class ShareListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: "",
      groupName: "",
      listing_id: "",
      user: {}
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted!");
  }

  componentDidMount() {
    console.log("Mounted!");
  }

  sharingStyle = {
    marginLeft: "100px",
    marginRight: "100px",
    marginBottom: "100px"
  };

  render() {
    return (
      <div className='shareHome' style={this.sharingStyle}>
        <ListGroup id='listgroup'>
            {/* Show the listing you clicked 'share' on... */}
            <Listing />
        </ListGroup>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId='username'>
            <FormLabel>Who do you want to share this home with?</FormLabel>
            <FormControl
              autoFocus
              type='groupName'
              placeholder='Group Name'
              value={this.state.groupName}
              onChange={this.handleChange}
              autoComplete='off'
            />
          </FormGroup>
          <Button
            variant='success'
            type='submit'
            text='Share'
            onClick={this.handleSubmit}
          >
            Start Collaborating!
          </Button>
        </Form>
      </div>
    );
  }
}

export default ShareListing;
