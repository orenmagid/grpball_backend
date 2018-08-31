import React, { Component } from "react";

export default class CreateOrJoinGroup extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="ui inverted segment">
          <div className="ui header"> Join a Group</div>

          <form
            className="ui inverted form"
            onSubmit={this.props.handleJoinGroupSubmit}
          >
            <div className="field">
              <label>Group Name</label>
              <input type="text" name="groupname" placeholder="Group Name" />
            </div>
            <div className="field">
              <label>Group ID</label>
              <input type="number" name="groupid" placeholder="Group Id" />
            </div>

            <button
              type="submit"
              className="ui secondary basic inverted button"
            >
              Join Group
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
