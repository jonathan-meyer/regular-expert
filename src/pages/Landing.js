import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import Listing from "../components/Listing";

import API from "../utils/API";

class Landing extends Component {
  state = {
    location: "Portsmouth, NH",
    message: "Hey, this is the landing page!",
    listings: [],
    loading: false
  };

  changeHandler(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    console.log({ query });

    API.searchListings(query)
      .then(data => {
        console.log({ data });
        this.setState({ loading: false, listings: data.data.listings });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log({ err });
      });
  };

  render() {
    const { query, listings, loading } = this.state;

    return (
      <div>
        <h1>{this.state.message}</h1>
        <Form onSubmit={e => this.handleFormSubmit(e)}>
          <Form.Control
            Location={this.state.location}
            type="text"
            id="query"
            value={query}
            onChange={e => this.changeHandler(e)}
          ></Form.Control>
        </Form>
        {loading && <span>loading...</span>}
        <ListGroup>
          {listings.map((listing, key) => (
            <Listing key={key} {...listing} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Landing;
