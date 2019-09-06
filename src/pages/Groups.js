import React, { Component } from "react";
import {Card, Button, Table, Container, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

class Groups extends Component {
  render() {
    const { user, group } = this.props;
    return (
      <>
<div>   
        <Container>
          <h1>Your Groups</h1><br></br>
        <Row>
    <Col width='100%'>
    <Table striped bordered hover width='100%'>
  <thead>
    <tr>
      <th>Group Name</th>
      <th>Last Collaboration Date</th>
      <th># of Collaborators</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Roommates</td>
      <td>9/6/2019</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Friends</td>
      <td>9/6/2019</td>
      <td>14</td>
    </tr>
    <tr>
      <td>Family</td>
      <td>9/1/2019</td>
      <td>8</td>
    </tr>
  </tbody>
</Table>


    
    </Col>
    </Row>
    </Container>
    </div>
      </>
    );
  }
}

export default Groups;
