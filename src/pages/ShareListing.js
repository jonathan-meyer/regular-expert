import React, { Component } from "react";

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
    const { fetchingGroup } = this.state;
    const { match } = this.props;

    console.log("componentDidMount");

    if (!fetchingGroup && !group.name && match.params.id) {
      this.setState({ fetchingGroup: true });

      axios
        .get(`/api/group/`, {
          params: { populate: ["users"] }
        })
        .then(res => res.data)
        .then(data => {
          this.setState({ fetchingGroup: false, group: data });
        })
        .catch(err => {
          this.setState({ fetchingGroup: false, group: {} });
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
          <FormGroup controlId='username'>
            <FormLabel>Who do you want to share this home with?</FormLabel>
            <FormControl
              autoFocus
              type='groupName'
              placeholder='Group Name'
              value={""}
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
