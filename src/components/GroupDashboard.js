import React, { Component } from "react";
import GroupCard from "./GroupCard";

class GroupDashboard extends Component {
  render() {
    let user = this.props.user;
    return (
      <div class="ui three doubling stackable cards">
        {user.groups.map(group => (
          <GroupCard key={group.id} group={group} user={user} />
        ))}
      </div>
    );
  }
}

export default GroupDashboard;
