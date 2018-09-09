import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";

export default class CreateOrJoinGroup extends Component {
  state = { address: "" };

  captureAddress = address => {
    this.setState({ address: address });
  };

  render() {
    return (
      <React.Fragment>
        <div className="ui header"> Create New Group</div>

        <form
          className="ui form"
          onSubmit={e => this.props.handleNewGroupSubmit(e, this.state.address)}
        >
          <div className="field">
            <label>Group Name</label>
            <input type="text" name="groupname" placeholder="Group Name" />
          </div>
          <LocationSearchInput
            type="group"
            captureAddress={this.captureAddress}
          />

          <button type="submit" className="ui secondary basic  button">
            Create Group
          </button>
        </form>
      </React.Fragment>
    );
  }
}
