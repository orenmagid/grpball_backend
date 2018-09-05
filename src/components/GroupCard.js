import React, { Component } from "react";
import { Message, Icon, Card } from "semantic-ui-react";
import moment from "moment";
import SessionScheduler from "./SessionScheduler";
import AddUserFormCard from "./AddUserFormCard";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball.herokuapp.com/api/v1";

export default class GroupCard extends Component {
  state = {
    group: null,

    users: [],
    formToShow: "none"
  };

  componentDidMount() {
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
  }

  handleOpenAddUserClick = e => {
    e.preventDefault();
    this.setState({
      formToShow: "addUser"
    });
  };

  handleOpenSuggestSessionClick = e => {
    e.preventDefault();
    this.setState({
      formToShow: "suggestSession"
    });
  };

  handleCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  handleAddToGroupSubmit = e => {
    e.preventDefault();

    let username = e.target.username.value;
    e.target.reset();
    let data = {
      username: username
    };

    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${this.props.group.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(group => {
          this.props.handleForceUserUpdate();
          this.setState({
            group: group,
            users: group.users,
            formToShow: "none"
          });
        });
    }
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

  render() {
    const { user, handleAccordianDisplay } = this.props;
    let group = this.state.group;
    let users = this.state.users;

    let userGroup;

    if (group) {
      userGroup = group.user_groups.find(user_group => {
        return user_group.user_id === user.id;
      });
    }

    return (
      <Card fluid>
        <Card.Content extra>
          <div className="ui two column grid">
            <div className="column">
              Joined:{" "}
              {userGroup ? moment(userGroup.created_at).calendar() : null}
            </div>
            <div className="column">
              <i className="user icon" />
              {users.length > 0 ? (
                <a href="0" onClick={e => handleAccordianDisplay(e, 1)}>
                  {users.length} members
                </a>
              ) : null}
            </div>
          </div>
        </Card.Content>
        <Card.Content>
          <div>
            <button
              onClick={() => this.handleLeaveGroup(group, user)}
              className="ui circular mini basic button"
            >
              Leave Group
            </button>
          </div>

          <Card.Header>{this.props.group.name}</Card.Header>
          <Card.Meta>{this.props.group.location}</Card.Meta>
          <Card.Meta>Group #: {this.props.group.id}</Card.Meta>
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
        {this.state.formToShow === "none" ? (
          <Card.Content extra>
            <div className="ui two column grid">
              <div className="column">
                <a href="add_user" onClick={this.handleOpenAddUserClick}>
                  <Icon name="add square" />
                  Add User
                </a>
              </div>

              <div className="column">
                <a
                  href="suggest_session"
                  onClick={this.handleOpenSuggestSessionClick}
                >
                  <Icon name="calendar plus" />
                  Suggest Session
                </a>
              </div>
            </div>
          </Card.Content>
        ) : null}
      </Card>
    );
  }
}
