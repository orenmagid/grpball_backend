import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class About extends Component {
  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>About GRPBALL</Card.Header>

          <Card.Description>
            GRPBALL is for people who play basketball.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
