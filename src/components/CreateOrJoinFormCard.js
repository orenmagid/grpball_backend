import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

export default class FormCard extends Component {
  render() {
    return (
      <Segment padded>
        <CreateGroup handleNewGroupSubmit={this.props.handleNewGroupSubmit} />
        <JoinGroup handleJoinGroupSubmit={this.props.handleJoinGroupSubmit} />
      </Segment>
    );
  }
}
