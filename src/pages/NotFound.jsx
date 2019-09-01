import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function(props) {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Jumbotron>
        <h1>404 Not Found</h1>
      </Jumbotron>
    </Container>
  );
}
