import React, { Component } from "react";

import GroupCard from "../components/GroupCard";
import { Grid, Menu, Segment } from "semantic-ui-react";
import GroupSubDashboard from "./GroupSubDashboard";
import CreateOrJoinFormCard from "../components/CreateOrJoinFormCard";

const baseUrl = "http://localhost:3000/api/v1";

class GroupDashboard extends Component {
  state = {
    activeItem: this.props.user.groups[0].name,
    activeIndex: ""
  };

  handleJoinGroupSubmit = e => {
    e.preventDefault();
    console.log("inside handleJoinGroupSubmit");
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
          this.props.handleForceUserUpdate();
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
      .then(jsonData => this.props.handleForceUserUpdate());
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleAccordianDisplay = (e, activeIndex) => {
    e.preventDefault();
    if (activeIndex === this.state.activeIndex) {
      this.setState({
        activeIndex: "activeIndex"
      });
    } else {
      this.setState({
        activeIndex: activeIndex
      });
    }
  };

  render() {
    let user = this.props.user;
    let { sessions, handleForceUserUpdate, handleFetchSessions } = this.props;

    const { activeItem, activeIndex } = this.state;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column stretched width={12}>
            <Segment>
              {activeItem === "create_or_join" ? (
                <React.Fragment>
                  <CreateOrJoinFormCard
                    handleNewGroupSubmit={this.handleNewGroupSubmit}
                    handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                  />
                </React.Fragment>
              ) : null}

              {user.groups.map(
                group =>
                  activeItem === group.name ? (
                    <React.Fragment key={group.id}>
                      <GroupCard
                        sessions={sessions}
                        key={group.id}
                        group={group}
                        user={user}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                        handleNewGroupSubmit={this.handleNewGroupSubmit}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                      />
                      <GroupSubDashboard
                        group={group}
                        sessions={sessions}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                        user={user}
                      />
                    </React.Fragment>
                  ) : null
              )}
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Menu size="tiny" fluid vertical tabular="right">
              <Menu.Item
                name="create_or_join"
                active={activeItem === "create_or_join"}
                onClick={this.handleItemClick}
              />
              {user.groups.map(group => (
                <Menu.Item
                  key={group.id}
                  name={group.name}
                  active={activeItem === group.name}
                  onClick={this.handleItemClick}
                />
              ))}
            </Menu>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GroupDashboard;
