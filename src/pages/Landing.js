import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import ListingSummary from "../components/ListingSummary";
import API from "../utils/API";

import "./landing.css";
import banner from "../assets/cover.jpg";

class Landing extends Component {
  state = {
    query: "",
    listings: [],
    loading: false
  };

  changeHandler(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { query } = this.state;

    API.searchListings(query)
      .then(data => {
        console.log({ data });
        this.setState({ loading: false, listings: data.data.listings });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log({ err });
      });
  }

  render() {
    const { query, listings, loading } = this.state;

    return (
      <Card className="card-img-underlay">
        <div className="banner">
          <img src={banner} alt="banner" className="banner"></img>
        </div>
        <Card.ImgOverlay>
          <Card id="card">
            <Card.Header>
              <h1 className="text-center">
                Finding Your Dream Home Starts Here
              </h1>
            </Card.Header>
            <Card.Body>
              <Form.Label>
                Looking for a new home? Want to collaborate with others on the
                properties you find interesting? Start your search now!
              </Form.Label>

              <Form onSubmit={e => this.handleFormSubmit(e)}>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter a location..."
                    aria-label="location"
                    aria-describedby="basic-addon2"
                    type="text"
                    id="query"
                    value={query}
                    onChange={e => this.changeHandler(e)}
                  />
                  <InputGroup.Append>
                    <Button variant="dark" type="submit">
                      Find Home!
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
          {loading && <span>loading...</span>}
          <ListGroup>
            {listings.map((listing, key) => (
              <ListGroup.Item key={key}>
                <ListingSummary {...listing} share />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default Landing;
