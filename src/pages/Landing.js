import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Listing from "../components/Listing";
import API from "../utils/API";
import ReactPlayer from 'react-player';

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
      margin: '-250px',
    }
    
    const cardStyle = {
      margin: '25%',
    }

    return (
      <div>
        <div class="card-img-underlay" style={Mp4Style}>
        <ReactPlayer
          className='react-player'
          url='https://player.vimeo.com/external/236075858.hd.mp4?s=539faad12f040eb5afd8de3160db1220f1a5bac0&profile_id=175&oauth2_token_id=57447761&download=1'
          playing
          loop
          muted
          width='100%'
          height='100%'
          config={{ file: { attributes: {
            autoPlay: true,
            muted: true,
            preload: true,
            fs: 0
            }}}}
          />

          <div class="card-img-overlay" style={cardStyle}>
              <Card className="mt-1">
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
              </div>
      </div>      
    </div>
    );
  }
}

export default Landing;
