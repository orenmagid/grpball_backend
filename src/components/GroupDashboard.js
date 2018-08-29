import React, { Component } from "react";
import GroupCard from "./GroupCard";

const baseUrl = "http://localhost:3000/api/v1";

class GroupDashboard extends Component {
  handleJoinGroupSubmit = e => {
    e.preventDefault();
    let groupName = e.target.groupname.value;
    let groupId = e.target.groupid.value;
    e.target.reset();
    let data = {
      name: groupName,
      id: groupId,
      user_id: this.props.user.id
    };
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${groupId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(jsonData => {
          console.log(jsonData);
          this.props.handleForceUpdate();
        });
    }
  };

  handleNewGroupSubmit = e => {
    e.preventDefault();

    let newGroupName = e.target.groupname.value;
    let newGroupLocation = e.target.location.value;
    let data = {
      name: newGroupName,
      location: newGroupLocation,
      user_id: this.props.user.id
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/groups`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => this.props.handleForceUpdate());
  };

  render() {
    let user = this.props.user;
    let handleforceUpdate = this.props.handleforceUpdate;

    return (
      <div className="ui three doubling stackable cards">
        <div className="card">
          <div className="content">
            <div className="header"> Create New Group</div>
            <div className="meta" />
            <div className="description" />
          </div>

          <form className="ui form" onSubmit={this.handleNewGroupSubmit}>
            <div className="field">
              <label>Group Name</label>
              <input type="text" name="groupname" placeholder="Group Name" />
            </div>
            <div className="field">
              <label>Group Location</label>
              <input type="text" name="location" placeholder="Group Location" />
            </div>

            <button type="submit" className="ui secondary basic button">
              Create Group
            </button>
          </form>

          <div className="content">
            <div className="header"> Join a Group</div>
            <div className="meta" />
            <div className="description" />
          </div>

          <form className="ui form" onSubmit={this.handleJoinGroupSubmit}>
            <div className="field">
              <label>Group Name</label>
              <input type="text" name="groupname" placeholder="Group Name" />
              <label>Group ID</label>
              <input type="number" name="groupid" placeholder="Group Id" />
            </div>

            <button type="submit" className="ui secondary basic button">
              Join Group
            </button>
          </form>
        </div>

        {user.groups.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            user={user}
            handleforceUpdate={handleforceUpdate}
          />
        ))}
      </div>
    );
  }
}

export default GroupDashboard;
