import React, { Component } from "react";
import { Message, Card, Icon } from "semantic-ui-react";
import moment from "moment";
import SessionScheduler from "./SessionScheduler";
import AddUserFormCard from "./AddUserFormCard";

import { baseUrl } from "../constants";

export default class GroupCardMinimalDisplay extends Component {
  state = {
    group: null,
    users: [],
    formToShow: "none",
    hasRequested: false
  };

  componentDidMount() {
    this.fetchGroup(this.props.group);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.group) {
      this.fetchGroup(this.props.group);
    }
  }

  fetchGroup = group => {
    fetch(baseUrl + `/groups/${group.id}`)
      .then(res => res.json())
      .then(group => {
        this.setState({
          group: group,
          users: group.users
        });
      });
  };

  handleCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  handleLeaveGroup = (group, user) => {
    let token = localStorage.getItem("token");
    if (token) {
      let userGroup = user.user_groups.find(
        user_group => user_group.group_id === group.id
      );

      fetch(baseUrl + `/user_groups/${userGroup.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => this.props.handleForceUserUpdate());
    }
  };

  handleSendRequest = (e, group, user) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (token) {
      let data = {
        user_id: user.id,
        group_id: group.id,
        status: "New"
      };

      fetch(baseUrl + `/requests`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(newRequest => {});
    }
    this.fetchGroup(group);
    this.setState({ hasRequested: true });
    this.props.handleForceUserUpdate();
  };

  render() {
    const { user, handleAccordianDisplay, handleCloseClick } = this.props;

    let hasRequested = this.state.hasRequested;

    const group = this.state.group
      ? this.state.group.id !== this.props.group.id
        ? this.props.group
        : this.state.group
      : this.props.group;

    const users = this.state.users ? this.state.users : this.props.group.users;

    let userGroup;
    let userHasRequested = [];

    if (group && group.user_groups && localStorage.getItem("token")) {
      if (group.user_groups.length > 0) {
        userGroup = group.user_groups.find(user_group => {
          return user_group.user_id === user.id;
        });
      }
    }
    if (localStorage.getItem("token")) {
      userHasRequested = user.requests.filter(request => {
        return request.group_id === group.id;
      });
    }

    return (
      <Card fluid>
        <i className="window close outline icon" onClick={handleCloseClick} />

        <Card.Content extra>
          <div className="ui two column grid">
            <div className="row">
              <div className="column">
                {userGroup
                  ? "Joined: " + moment(userGroup.created_at).calendar()
                  : null}

                {!userGroup &&
                localStorage.getItem("token") &&
                userHasRequested.length === 0 &&
                !hasRequested ? (
                  <a
                    href="request_to_join"
                    onClick={e => this.handleSendRequest(e, group, user)}
                  >
                    <Icon name="mail" />
                    Request to Join this Group
                  </a>
                ) : null}
                {!localStorage.getItem("token") ? (
                  <div>
                    Create an Account to Join this Group <br />
                    <Icon name="signup" />
                  </div>
                ) : null}
              </div>

              <div className="column">
                <i className="user icon" />
                {/* <a href="0" onClick={e => handleAccordianDisplay(e, 1)}> */}
                {users ? `${users.length} members` : null}
                {/* </a> */}
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Content>
          <div>
            {userGroup ? (
              <button
                onClick={() => this.handleLeaveGroup(group, user)}
                className="ui circular mini basic button"
              >
                Leave Group
              </button>
            ) : null}
          </div>

          <Card.Header>Group Name: "{group.name}"</Card.Header>
          <Card.Meta>{group.location}</Card.Meta>
          <Card.Meta>Group #: {group.id}</Card.Meta>
          <div className="row centered">
            {(!userGroup &&
              localStorage.getItem("token") &&
              (userHasRequested.length > 0 &&
                (userHasRequested[0].status === "New" ||
                  userHasRequested[0].status === "Resolved"))) ||
            hasRequested === true ? (
              <Message warning>
                <Message.Header>Pending</Message.Header>
                <p>You have requested to join this group.</p>
              </Message>
            ) : null}

            {!userGroup &&
            localStorage.getItem("token") &&
            userHasRequested.length > 0 &&
            userHasRequested[0].status === "Denied" ? (
              <Message negative>
                <Message.Header>We are sorry!</Message.Header>
                <p>Your request to join this group has been denied.</p>
              </Message>
            ) : null}
          </div>

          {userGroup !== undefined && userGroup.is_administrator ? (
            <Message info>
              <Message.Header>You're in charge!</Message.Header>
              <p> You are an administrator of this group.</p>
            </Message>
          ) : null}
          {this.state.formToShow === "addUser" ? (
            <AddUserFormCard
              handleCloseClick={this.handleCloseClick}
              handleAddToGroupSubmit={this.handleAddToGroupSubmit}
            />
          ) : null}

          {this.state.formToShow === "suggestSession" ? (
            <SessionScheduler
              handleCloseClick={this.handleCloseClick}
              handleFetchSessions={this.props.handleFetchSessions}
              group={group}
              user={this.props.user}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}
