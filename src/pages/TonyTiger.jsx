import React from "react";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import Listing from "../components/Listing";

import API from "../utils/API";

class TonyTiger extends React.Component {
  state = {
    listings: [],
    loading: false
  };

  changeHandler(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  submitHandler(e) {
    e.preventDefault();
    const { query } = this.state;

    console.log({ query });

    this.setState({ loading: true });

    API.searchListings(query)
      .then(data => {
        console.log({ data });
        this.setState({ loading: false, listings: data.data.listings });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log({ err });
      });

    this.setState({ query: "" });
  }

  componentDidMount() {
    // API.searchListings();
  }

  render() {
    const { query, listings, loading } = this.state;

    return (
      <div>
        <Form onSubmit={e => this.submitHandler(e)}>
          <Form.Control
            type="text"
            id="query"
            value={query}
            onChange={e => this.changeHandler(e)}
          ></Form.Control>
        </Form>
        {loading && <div>Loading...</div>}
        <ListGroup>
          {listings.map((listing, key) => (
            <Listing key={key} {...listing} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default TonyTiger;
