import React, { Component } from "react";
import axios from "axios";

import Multiselect from "react-widgets/lib/Multiselect";

import {
  Form,
  FormGroup,
  ListGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";

class ShareListing extends Component {
  state = {
    groups: [],
    fetchingGroup: false
  };

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
    const { groups, fetchingGroup } = this.state;
    const { match } = this.props;

    if (match && !fetchingGroup && groups.length === 0) {
      console.log("getting groups");

      this.setState({ fetchingGroup: true });

      axios
        .get("/api/groups/mine")
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, groups: data });
          console.log({ groups: data });
        })
        .catch(err => {
          this.setState({ fetchingGroup: false, groups: [] });
          console.log(err);
        });
    }
  }

 
  sharingStyle = {
    marginLeft: "100px",
    marginRight: "100px",
    marginBottom: "100px"
  };

  render() {
    const {group, fetchingGroup} = this.state;
    const { match } = this.props;
    return (
      <div className='shareHome' style={this.sharingStyle}>
        <pre>{JSON.stringify(match, null, 2)}</pre>
        <ListGroup.Item>
          <h5 style={{ fontStyle: "italic" }}>{match.params.address}</h5>
          <p>{match.params.price}</p>
        </ListGroup.Item>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="groups">
            <Form.Label>Groups:</Form.Label>
            <Multiselect
            id="groups"
            textField={i => `${i.firstName} ${i.lastName}`}
            valueField="_id"
            value={group}
            onChange={items => this.handleMultiSelectChange(items)}
            data={group}
            busy={fetchingGroup}
            ></Multiselect>
        </Form.Group>
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
