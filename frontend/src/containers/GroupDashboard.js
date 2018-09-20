import React, { Component } from "react";

import GroupCard from "../components/GroupCard";
import { Grid, Menu, Segment } from "semantic-ui-react";
import GroupSubDashboard from "./GroupSubDashboard";
import CreateOrJoinFormCard from "../components/CreateOrJoinFormCard";
import MediaQuery from "react-responsive";

import { baseUrl } from "../constants";

class GroupDashboard extends Component {
  state = {
    activeItem:
      this.props.user.groups.length > 0
        ? this.props.user.groups[0].name
        : "create_group",
    activeIndex:
      this.props.user.groups.length > 0
        ? this.props.user.groups[0].name
        : "create_group",
    group: [],
    users: []
  };

  fetchGroup = group => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(group => {
          this.setState({
            group: group,
            users: group.users
          });
        });
    }
  };

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
          this.props.handleForceUserUpdate();
        });
    }
  };

  handleNewGroupSubmit = (e, latitude, longitude, address) => {
    e.preventDefault();

    let newGroupName = e.target.groupname.value;

    let data = {
      name: newGroupName,
      location: address,
      latitude: latitude,
      longitude: longitude,
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
      .then(jsonData => {
        this.setState({ activeIndex: newGroupName, activeItem: newGroupName });
        this.props.handleForceUserUpdate();
      });
  };

  handlePatchGroupSubmit = (e, group_id, latitude, longitude, address) => {
    e.preventDefault();

    let groupName = e.target.groupname.value;

    let data = {
      name: groupName,
      location: address,
      latitude: latitude,
      longitude: longitude
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/groups/${group_id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ group: jsonData });
        this.props.handleForceUserUpdate();
      });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name ? name : "create_group" });
  };

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
    let {
      user,
      sessions,
      handleForceUserUpdate,
      handleFetchSessions
    } = this.props;

    const { activeItem, activeIndex, group, users } = this.state;

    return (
      <Grid>
        <MediaQuery maxWidth={767}>
          <Grid.Row>
            <Menu size="tiny" tabular>
              <Menu.Item
                icon="plus"
                active={activeItem === "create_group"}
                onClick={this.handleItemClick}
              />
              {user.groups.map(group => (
                <Menu.Item
                  key={group.id}
                  name={group.name.split(/-|\s/g)[0]}
                  active={
                    activeItem === group.name ||
                    activeItem === group.name.split(/-|\s/g)[0]
                  }
                  onClick={this.handleItemClick}
                />
              ))}
            </Menu>
          </Grid.Row>
        </MediaQuery>
        <MediaQuery minWidth={767}>
          <Grid.Column stretched width={12}>
            <Segment>
              {activeItem === "create_group" ? (
                <React.Fragment>
                  <CreateOrJoinFormCard
                    handleNewGroupSubmit={this.handleNewGroupSubmit}
                    handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                  />
                </React.Fragment>
              ) : null}

              {user.groups.map(
                group =>
                  activeItem === group.name ||
                  activeItem === group.name.split(/-|\s/g)[0] ? (
                    <React.Fragment key={group.id}>
                      <GroupCard
                        sessions={sessions}
                        key={group.id}
                        group={group}
                        user={user}
                        users={users}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                        handleNewGroupSubmit={this.handleNewGroupSubmit}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                        handleFetchGroup={this.fetchGroup}
                        handleFetchGroups={this.props.handleFetchGroups}
                        handlePatchGroupSubmit={this.handlePatchGroupSubmit}
                      />
                    </React.Fragment>
                  ) : null
              )}
            </Segment>
          </Grid.Column>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <Grid.Column stretched width={16}>
            <Segment>
              {activeItem === "create_group" ? (
                <React.Fragment>
                  <CreateOrJoinFormCard
                    handleNewGroupSubmit={this.handleNewGroupSubmit}
                    handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                  />
                </React.Fragment>
              ) : null}

              {user.groups.map(
                group =>
                  activeItem === group.name ||
                  activeItem === group.name.split(/-|\s/g)[0] ? (
                    <React.Fragment key={group.id}>
                      <GroupCard
                        sessions={sessions}
                        key={group.id}
                        group={group}
                        user={user}
                        users={users}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                        handleNewGroupSubmit={this.handleNewGroupSubmit}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                        handleFetchGroup={this.fetchGroup}
                        handleFetchGroups={this.props.handleFetchGroups}
                        handlePatchGroupSubmit={this.handlePatchGroupSubmit}
                      />
                    </React.Fragment>
                  ) : null
              )}
            </Segment>
          </Grid.Column>
        </MediaQuery>
        <MediaQuery minWidth={767}>
          <Grid.Column width={4}>
            <Menu size="tiny" fluid vertical tabular="right">
              <Menu.Item
                name="create_group"
                active={activeItem === "create_or_join"}
                onClick={this.handleItemClick}
              />
              {user.groups.map(group => (
                <Menu.Item
                  key={group.id}
                  name={group.name}
                  active={
                    activeItem === group.name ||
                    activeItem === group.name.split(/-|\s/g)[0]
                  }
                  onClick={this.handleItemClick}
                />
              ))}
            </Menu>
          </Grid.Column>
        </MediaQuery>
        <Grid.Row>
          {user.groups.map(
            group =>
              activeItem === group.name ||
              activeItem === group.name.split(/-|\s/g)[0] ? (
                <React.Fragment key={group.id}>
                  <MediaQuery minWidth={767}>
                    <Grid.Column width={12}>
                      <GroupSubDashboard
                        group={group}
                        sessions={sessions}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                        user={user}
                        users={users}
                      />
                    </Grid.Column>
                  </MediaQuery>
                  <MediaQuery maxWidth={767}>
                    <Grid.Column width={16}>
                      <GroupSubDashboard
                        group={group}
                        sessions={sessions}
                        activeIndex={activeIndex}
                        handleAccordianDisplay={this.handleAccordianDisplay}
                        handleForceUserUpdate={handleForceUserUpdate}
                        handleFetchSessions={handleFetchSessions}
                        handleItemClick={this.handleItemClick}
                        user={user}
                        users={users}
                      />
                    </Grid.Column>
                  </MediaQuery>
                </React.Fragment>
              ) : null
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default GroupDashboard;
