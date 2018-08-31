import React, { Component } from "react";

export default class CreateOrJoinGroup extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="ui inverted segment">
          <div className="ui header"> Create New Group</div>

          <form
            className="ui  inverted form"
            onSubmit={this.props.handleNewGroupSubmit}
          >
            <div className="field">
              <label>Group Name</label>
              <input type="text" name="groupname" placeholder="Group Name" />
            </div>
            <div className="field">
              <label>Group Location</label>
              <input type="text" name="location" placeholder="Group Location" />
            </div>

            <button
              type="submit"
              className="ui secondary basic inverted button"
            >
              Create Group
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
