import React, { Component } from "react";

import Listing from "../components/Listing";
import {
  Form,
  FormGroup,
  ListGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";

class ShareListing extends Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted!");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  componentDidMount() {
    console.log("Mounted!");
  }

  sharingStyle = {
    marginLeft: "100px",
    marginRight: "100px",
    marginBottom: "100px"
  };

  render() {
    const { match } = this.props;
    return (
      <div className='shareHome' style={this.sharingStyle}>
        <pre>{JSON.stringify(match, null, 2)}</pre>
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
              value={'hi'}
              onChange={e => this.handleChange(e)}
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
