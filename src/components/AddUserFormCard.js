import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class AddUserFormCard extends Component {
  render() {
    return (
      <Card centered>
        <i
          className="window close outline icon"
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
            <div className="ui checkbox">
              <input type="checkbox" name="administrator" />
              <label>Grant administrator priviledges</label>
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
