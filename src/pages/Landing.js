import React, { Component } from "react";
import ReactPlayer from "react-player";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import Listing from "../components/Listing";
import API from "../utils/API";

class Landing extends Component {
  state = {
    query: "Portsmouth, NH",
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
      <Card>
        <ReactPlayer
          className="w-100"
          width="100%"
          height="100%"
          url="https://player.vimeo.com/external/236075858.hd.mp4?s=539faad12f040eb5afd8de3160db1220f1a5bac0&profile_id=175&oauth2_token_id=57447761&download=1"
          playing
          loop
          muted
          config={{
            file: {
              attributes: {
                autoPlay: true,
                muted: true,
                preload: "true",
                fs: 0
              }
            }
          }}
        ></ReactPlayer>
        <Card.ImgOverlay style={{ "margin-top": 490 }}>
          <Card>
            <Card.Header>
              <h1>Lets Find a home Together</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={e => this.handleFormSubmit(e)}>
                <Form.Control
                  location={this.state.location}
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
            </Card.Body>
          </Card>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default Landing;
