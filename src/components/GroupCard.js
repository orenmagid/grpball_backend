import React, { Component } from "react";
import { List, Message, Popup, Button, Card } from "semantic-ui-react";
import moment from "moment";
import SessionScheduler from "./SessionScheduler";
import CreateOrJoinFormCard from "./CreateOrJoinFormCard";
import AddUserFormCard from "./AddUserFormCard";

const baseUrl = "http://localhost:3000/api/v1";

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

  handleOpenAddUserClick = () => {
    this.setState({
      formToShow: "addUser"
    });
  };

  handleOpenSuggestSessionClick = () => {
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
      }).then(() => this.props.handleForceUpdate());
    }
  };

  render() {
    const { user } = this.props;
    let group = this.state.group;
    let users = this.state.users;

    let userGroup;

    if (group) {
      userGroup = group.user_groups.find(user_group => {
        return user_group.user_id === user.id;
      });
    }

    return (
      <React.Fragment>
        <div className="ui two column grid">
          <div className="column">
            Created:{" "}
            {userGroup ? moment(userGroup.created_at).calendar() : null}
          </div>
          <div className="column">
            <i className="user icon" />
            {users.length > 0 ? users.length + " members" : null}
          </div>
        </div>
        <div>
          <button
            onClick={() => this.handleLeaveGroup(group, user)}
            className="ui circular mini basic button"
          >
            Leave Group
          </button>
        </div>

        <div className="ui header">{this.props.group.name}</div>
        <div className="meta">{this.props.group.location}</div>
        <div className="meta">Group #: {this.props.group.id}</div>
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
        {this.state.formToShow === "none" ? (
          <button
            onClick={this.handleOpenAddUserClick}
            type="submit"
            className="ui secondary basic button"
          >
            Add User
          </button>
        ) : null}
        {this.state.formToShow === "none" ? (
          <button
            onClick={this.handleOpenSuggestSessionClick}
            type="submit"
            className="ui secondary basic button"
          >
            Suggest Session
          </button>
        ) : null}
      </React.Fragment>
    );
  }
}
