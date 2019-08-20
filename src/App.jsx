import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import API from "./utils/API";

class App extends React.Component {
  state = {};

  componentDidMount() {
    API.searchListings("Dover,NH").then(data => {
      console.log({ data });
      this.setState({ data });
    });
  }

  render() {
    return (
      <Container>
        <Card>
          <Card.Header>
            <h1>Let's Find a Home Together</h1>
          </Card.Header>
          <Card.Body>
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default App;
