import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  ListGroup
} from "react-bootstrap";
import Listing from "../components/Listing";
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

  saveHome() {
    let data = this.state.listings;
    
  }

  render() {
    const { query, listings, loading } = this.state;

    return (
      <>
        <Card className='card-img-underlay'>
          <div className='banner'>
            <img src={banner} alt='banner' className='banner'></img>
          </div>
          <Card.ImgOverlay>
            <Card id='card'>
              <Card.Header>
                <h1 className='text-center'>
                  Finding Your Dream Home Starts Here
                </h1>
              </Card.Header>
              <Card.Body>
                <Form.Label>
                  Looking for a new home? Want to collaborate with others on the
                  properties you find interesting? Start your search now!
                </Form.Label>

                <Form onSubmit={e => this.handleFormSubmit(e)}>
                  <InputGroup className='mb-3'>
                    <FormControl
                      placeholder="Enter a location..."
                      aria-label="location"
                      aria-describedby='basic-addon2'
                      location={this.state.location}
                      type='text'
                      id='query'
                      value={query}
                      onChange={e => this.changeHandler(e)}
                    />
                    <InputGroup.Append>
                      <Button
                        variant='dark'
                        onClick={e => this.handleFormSubmit(e)}
                      >
                        Find Home!
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Card.Body>
            </Card>
            {loading && <span>loading...</span>}
            <ListGroup id='listgroup'>
              {listings.map((listing, key) => (
                <Listing key={key} {...listing} />
              ))}
            </ListGroup>
          </Card.ImgOverlay>
        </Card>
      </>
    );
  }
}

export default Landing;
