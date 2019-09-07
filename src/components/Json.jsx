import React from "react";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export default function({ title, children }) {
  return (
    <Accordion className="mt-3" defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <pre>{JSON.stringify(children, null, 2)}</pre>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>&nbsp;</Card>
    </Accordion>
  );
}
