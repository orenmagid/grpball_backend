import React, { Component } from "react";
import { Message, Icon, Card, List } from "semantic-ui-react";
import moment from "moment";
import SessionScheduler from "./SessionScheduler";
import AddUserFormCard from "./AddUserFormCard";
import GrantAdminStatusCard from "./GrantAdminStatusCard";
import ReviewRequestCard from "./ReviewRequestCard";
import MediaQuery from "react-responsive";
import EditGroup from "./EditGroup";

import { baseUrl } from "../constants";

export default class GroupCard extends Component {
  state = {
    group: null,
    users: [],
    request: null,
    formToShow: "none"
  };

  componentDidMount() {
    this.fetchGroup();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.group) {
      this.fetchGroup();
    }
  }

  handleOpenAddUserClick = e => {
    e.preventDefault();
    this.setState({
      formToShow: "addUser"
    });
  };

  handleOpenGrantAdminClick = e => {
    e.preventDefault();
    this.setState({
      formToShow: "grantAdmin"
    });
  };

  handleEditGroupClick = e => {
    e.preventDefault();
    this.setState({
      formToShow: "editGroup"
    });
  };

  fetchGroup = () => {
    console.log("fetching group");
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${this.props.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(group => {
          console.log("group", group);
          this.setState({
            group: group,
            users: group.users
          });
        })
        .catch(e => alert(e));
    }
  };

  handleGrantAdminSubmit = userId => {
    let userGroup = this.state.group.user_groups.find(ug => {
      console.log("ug.user_id", ug.user_id);
      console.log("userId", userId);
      return parseInt(ug.user_id) === parseInt(userId);
    });

    console.log(userGroup);

    let data = {
      is_administrator: true
    };

    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/user_groups/${userGroup.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(user_group => {
          this.setState({
            formToShow: "non"
          });
          this.props.handleForceUserUpdate();
          this.fetchGroup();
        })
        .catch(e => alert(e));
    }
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

  handleAddToGroupSubmit = (e, value = "Yes") => {
    console.log("e.target.administrator", e.target.administrator);
    console.log("value", value);
    e.preventDefault();
    let data;
    let token = localStorage.getItem("token");
    if (value === "Yes" && e.target.administrator) {
      let username = e.target.username.value;
      let administrator = e.target.administrator.checked;

      e.target.reset();
      data = {
        username: username,
        is_administrator: administrator
      };

      if (token) {
        fetch(baseUrl + `/groups/${this.state.group.id}`, {
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
            this.fetchGroup();
            this.props.handleFetchGroups();
          })
          .catch(e => alert(e));

        // fetch(baseUrl + `/requests/${this.state.request.id}`, {
        //   method: "PATCH",
        //   body: JSON.stringify({ status: "Accepted" }),
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        //   .then(response => response.json())
        //   .then(request => {
        //     this.setState({
        //       request: request,
        //       formToShow: "none"
        //     });
        //     this.props.handleForceUserUpdate();
        //   })
        //   .catch(e => alert(e));
      }
    }

    if (value === "Yes" && e.target.administrator === undefined) {
      let user_id = this.state.request.user_id;
      let administrator = false;

      e.target.reset();
      data = {
        user_id: user_id,
        is_administrator: administrator
      };

      if (token) {
        fetch(baseUrl + `/groups/${this.state.group.id}`, {
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
            this.fetchGroup();
            this.props.handleFetchGroups();
          })
          .catch(e => alert(e));

        fetch(baseUrl + `/requests/${this.state.request.id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "Accepted" }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(request => {
            this.setState({
              request: null,
              formToShow: "none"
            });
            this.fetchGroup();
            this.props.handleFetchGroups();
          })
          .catch(e => alert(e));
      }
    }
    if (value === "No") {
      fetch(baseUrl + `/requests/${this.state.request.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Denied" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(request => {
          this.setState({
            request: null,
            formToShow: "none"
          });
          this.fetchGroup();
          this.props.handleFetchGroups();
        })
        .catch(e => alert(e));
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

  handleDisplayRequest = (e, request) => {
    e.preventDefault();
    this.setState({
      request: request,
      formToShow: "displayRequests"
    });
  };

  render() {
    const { user, handleAccordianDisplay } = this.props;
    let group = this.state.group;
    let users = this.state.users;

    let userGroup;
    let administrators;
    let administratorUserGroups;
    let nonUserAdmins;

    if (group && users.length !== 0) {
      userGroup = group.user_groups.find(user_group => {
        return user_group.user_id === user.id;
      });
      administratorUserGroups = group.user_groups.filter(user_group => {
        return user_group.is_administrator;
      });
      if (administratorUserGroups) {
        administrators = users.filter(user => {
          for (var i = 0; i < administratorUserGroups.length; i++) {
            if (administratorUserGroups[i].user_id === user.id) {
              return true;
            }
          }
        });
        nonUserAdmins = administrators.filter(admin => admin.id !== user.id);
      }
    }

    let newRequests;

    if (group) {
      newRequests = group.requests.filter(request => request.status === "New");
    }

    console.log("nonUserAdmins", nonUserAdmins);
    console.log("users", users);
    console.log("newRequests", newRequests);

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
              <br />
              <p> You are an administrator of this group.</p>
              {nonUserAdmins.length > 0 ? "Other Administrators: " : null}
              <br />
              <List horizontal>
                {nonUserAdmins.map(administrator => {
                  return (
                    <List.Item key={administrator.id}>
                      {administrator.first_name + " " + administrator.last_name}{" "}
                    </List.Item>
                  );
                })}
              </List>
              {users.length > 1 ? (
                <div className="ui three column grid">
                  <div className="column">
                    <a href="add_user" onClick={this.handleOpenAddUserClick}>
                      <Icon name="add square" />
                      Add User
                    </a>
                  </div>
                  <div className="column">
                    <a href="edit_group" onClick={this.handleEditGroupClick}>
                      <Icon name="write" />
                      Edit Group Info
                    </a>
                  </div>
                  <div className="column">
                    <a href="add_user" onClick={this.handleOpenGrantAdminClick}>
                      <Icon name="handshake outline" />
                      Grant Admin Priviledges
                    </a>
                  </div>
                </div>
              ) : (
                <div className="ui two column grid">
                  <div className="column">
                    <a href="add_user" onClick={this.handleOpenAddUserClick}>
                      <Icon name="add square" />
                      Add User
                    </a>
                  </div>
                  <div className="column">
                    <a href="edit_group" onClick={this.handleEditGroupClick}>
                      <Icon name="write" />
                      Edit Group Info
                    </a>
                  </div>
                </div>
              )}
            </Message>
          ) : null}

          {newRequests &&
          newRequests.length > 0 &&
          userGroup.is_administrator ? (
            <Message info>
              <Message.Header>You have new requests.</Message.Header>
              <List horizontal>
                {newRequests.map(request => {
                  return (
                    <List.Item key={request.id}>
                      <a
                        href="request"
                        onClick={e => {
                          this.handleDisplayRequest(e, request);
                        }}
                      >
                        {request.status}{" "}
                      </a>
                    </List.Item>
                  );
                })}
              </List>
            </Message>
          ) : null}

          {administrators &&
          userGroup !== undefined &&
          !userGroup.is_administrator ? (
            <Message warning>
              <Message.Header>
                {administrators.length > 1
                  ? "Group Administrators"
                  : "Group Administrator"}
              </Message.Header>
              <List horizontal>
                {administrators.map(administrator => {
                  return (
                    <List.Item key={administrator.id}>
                      {administrator.first_name + " " + administrator.last_name}{" "}
                    </List.Item>
                  );
                })}
              </List>
              <MediaQuery minWidth={992}>
                <p>
                  Administrators can add and remove users from the group, as
                  well as control certain default settings. If you'd like to
                  become an administrator of this group, send a message to this
                  group's administrator(s) by clicking "Conversations" above.
                </p>
              </MediaQuery>
              <MediaQuery maxWidth={992}>
                <p>
                  Administrators can add and remove users from the group, as
                  well as control certain default settings. If you'd like to
                  become an administrator of this group, send a message to this
                  group's administrator(s) by clicking <Icon name="chat" />{" "}
                  above.
                </p>
              </MediaQuery>
              {/* <a
                href="message_administrator"
                // onClick={this.handleOpenAddUserClick}
              >
                <Icon name="mail" />
                {administrators.length > 1
                  ? "Message the Administrators"
                  : "Message the Administrator"}
              </a> */}
            </Message>
          ) : null}
          {this.state.formToShow === "addUser" ? (
            <AddUserFormCard
              handleCloseClick={this.handleCloseClick}
              handleAddToGroupSubmit={this.handleAddToGroupSubmit}
              nonUserAdmins={nonUserAdmins}
            />
          ) : null}
          {this.state.formToShow === "grantAdmin" ? (
            <GrantAdminStatusCard
              user={user}
              users={users}
              group={group}
              handleCloseClick={this.handleCloseClick}
              handleGrantAdminSubmit={this.handleGrantAdminSubmit}
              nonUserAdmins={nonUserAdmins}
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

          {this.state.formToShow === "displayRequests" && this.state.request ? (
            <ReviewRequestCard
              handleCloseClick={this.handleCloseClick}
              request={this.state.request}
              user={this.props.user}
              handleAddToGroupSubmit={this.handleAddToGroupSubmit}
            />
          ) : null}
          {this.state.formToShow === "editGroup" ? (
            <EditGroup
              handleCloseClick={this.handleCloseClick}
              group={group}
              user={this.props.user}
              handlePatchGroupSubmit={this.props.handlePatchGroupSubmit}
              handleCloseClick={this.handleCloseClick}
            />
          ) : null}
        </Card.Content>
        {this.state.formToShow === "none" ? (
          <Card.Content extra>
            <a
              href="suggest_session"
              onClick={this.handleOpenSuggestSessionClick}
            >
              <Icon name="calendar plus" />
              Suggest Session
            </a>
          </Card.Content>
        ) : null}
      </Card>
    );
  }
}
