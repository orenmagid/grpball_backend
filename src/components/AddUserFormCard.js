import React, { Component } from "react";
import { Segment, Card, Icon, Message } from "semantic-ui-react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

export default class AddUserFormCard extends Component {
  render() {
    return (
      <Card centered>
        <Message color="black">
          <i
            className="window close icon"
            onClick={this.props.handleCloseClick}
          />
          <Card.Content>
            <form
              className="ui form"
              onSubmit={this.props.handleAddToGroupSubmit}
            >
              <div className="field">
                <h4>Add User By Username</h4>
                <input type="text" name="username" placeholder="username" />
              </div>

              <button type="submit" className="ui secondary basic button">
                Submit
              </button>
            </form>
          </Card.Content>
        </Message>
      </Card>
    );
  }
}
