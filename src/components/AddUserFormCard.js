import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class AddUserFormCard extends Component {
  render() {
    return (
      <Card centered>
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
      </Card>
    );
  }
}
