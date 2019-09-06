import React, { Component } from "react";
import ReactPlayer from "react-player";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

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

    const Mp4Style = {
      margin: '0 auto',
      paddingLeft: '0px',
    }

    return (
      <Card style={Mp4Style}>
        <ReactPlayer
          class="card-img-underlay"
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
        <Card.ImgOverlay>
          <Card>
            <Card.Header>
              <h1 className="text-center">Let's Find a Home Together</h1>
            </Card.Header>
            <Card.Body>
              <Form.Label>
              Looking for a new home? Want to collaborate with others on the properties you find interesting? Start your search now! 
              </Form.Label>
            
            <Form onSubmit={e => this.handleFormSubmit(e)}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  location={this.state.location}
                  type="text"
                  id="query"
                  value={query}
                  onChange={e => this.changeHandler(e)}
                />
                <InputGroup.Append>
                  <Button variant="dark">Find Home!</Button>
                </InputGroup.Append>
              </InputGroup>
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
