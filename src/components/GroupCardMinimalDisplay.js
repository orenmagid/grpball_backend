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
    formToShow: "none"
  };

  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.group) {
      this.fetchGroup();
    }
  }

  fetchGroup = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${this.props.group.id}`, {
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
        .then(newRequest => {
          console.log(newRequest);
        });
    }
    this.props.handleFetchGroup(group);
    this.props.handleforceUserUpdate();
  };

  render() {
    const { user, handleAccordianDisplay } = this.props;
    let group = this.props.group;
    let users = this.props.users;

    let userGroup;
    let userHasRequested;

    if (group) {
      userGroup = group.user_groups.find(user_group => {
        return user_group.user_id === user.id;
      });

      userHasRequested = user.requests.filter(request => {
        return request.group_id === group.id;
      });
    }

    console.log("this.props", this.props);
    console.log("userHasRequested", userHasRequested);

    return (
      <Card fluid>
        <i
          className="window close icon"
          onClick={this.props.handleCloseClick}
        />

        <Card.Content extra>
          <div className="ui two column grid">
            <div className="row">
              <div className="column">
                {userGroup
                  ? "Joined: " + moment(userGroup.created_at).calendar()
                  : null}

                {!userGroup &&
                localStorage.getItem("token") &&
                userHasRequested.length === 0 ? (
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
                {users.length} members
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
            {!userGroup &&
            localStorage.getItem("token") &&
            userHasRequested.length > 0 &&
            userHasRequested[0].status === "New" ? (
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
