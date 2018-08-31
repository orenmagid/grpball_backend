import React, { Component } from "react";
import moment from "moment";
import { Card } from "semantic-ui-react";

export default class SessionInfo extends Component {
  render() {
    const { session } = this.props;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {session.status} Session on {moment(session.date).calendar()}
          </Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra />
      </Card>
    );
  }
}
