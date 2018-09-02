import React, { Component } from "react";
import { Accordion, Icon, Grid, Table, Popup, Button } from "semantic-ui-react";
import moment from "moment";
import Sessions from "./Sessions";
import InteractiveSegment from "./InteractiveSegment";
import InfoSegment from "./InfoSegment";
import GroupFeed from "./GroupFeed";

const baseUrl = "http://localhost:3000/api/v1";

export default class GroupAccordian extends Component {
  state = {
    activeIndex: "",
    group: null,
    users: [],
    currentRsvp: "",
    currentSession: null,
    formToShow: "none",
    groupFeed: [],
    groupNotifications: []
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
      // Fetch group feed
      fetch(`http://localhost:3000/group/${this.props.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(groupFeed => {
          console.log("groupFeed", groupFeed);
          this.setState({ groupFeed: groupFeed });
        })
        .catch(e => console.error(e));

      // Fetch user notifications
      fetch(`http://localhost:3000/notification_group/${this.props.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(groupNotifications => {
          console.log("groupNotifications", groupNotifications);
          this.setState({ groupNotifications: groupNotifications });
        })
        .catch(e => console.error(e));
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleNewRsvp = (e, sessionId) => {
    e.preventDefault();

    let data = {
      user_id: this.props.user.id,
      session_id: sessionId,
      status: e.target.status.value,
      other_text: e.target.otherText.value
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/rsvps`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.handleFormCloseClick();
        this.handleShowSession(this.state.currentSession);
        this.props.handleFetchSessions();
      });
  };

  handleEditRsvp = (e, sessionId, otherText) => {
    e.preventDefault();

    let data = {
      user_id: this.props.user.id,
      session_id: sessionId,
      status: e.target.status.value,
      other_text: otherText
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/rsvps/${this.state.currentRsvp.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.props.handleFetchSessions();
        this.handleShowSession(this.state.currentSession);
        this.handleFormCloseClick();
      });
  };

  handleFormCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  handleSessionCloseClick = () => {
    this.setState({
      currentSession: null
    });
  };

  handleShowSession = currentSession => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/sessions/${currentSession.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(session => {
          let myRsvp = session.rsvps.find(
            rsvp => rsvp.user_id === this.props.user.id
          );
          console.log("myRsvp", myRsvp);
          this.setState({
            currentSession: session,
            currentRsvp: myRsvp
          });
        });
    }
  };

  handleRsvpClick = (rsvp = null) => {
    if (rsvp) {
      this.setState({
        currentRsvp: rsvp,
        formToShow: "editRsvp"
      });
    } else {
      this.setState({
        formToShow: "newRsvp"
      });
    }
  };

  render() {
    const { activeIndex, users, formToShow, currentSession } = this.state;
    const { sessions, group, user } = this.props;
    let currentRsvp;

    return (
      <React.Fragment>
        {currentSession ? (
          <InfoSegment
            handleRsvpClick={this.handleRsvpClick}
            handleCloseClick={this.handleSessionCloseClick}
            session={this.state.currentSession}
            rsvp={this.state.currentRsvp}
            group={this.state.group}
            user={user}
          />
        ) : null}

        {formToShow === "editRsvp" || formToShow === "newRsvp" ? (
          <InteractiveSegment
            handleCloseClick={this.handleFormCloseClick}
            formToShow={this.state.formToShow}
            session={this.state.currentSession}
            rsvp={this.state.currentRsvp}
            handleEditRsvp={this.handleEditRsvp}
            handleNewRsvp={this.handleNewRsvp}
            group={this.state.group}
          />
        ) : null}

        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            This Group's Sessions
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Table compact fixed striped singleLine size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Min Players</Table.HeaderCell>
                  <Table.HeaderCell># of RSVPs</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Automatic Expiration</Table.HeaderCell>
                  <Table.HeaderCell>RSVP</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {sessions.map(session => {
                  if (session.group_id === group.id) {
                    return (
                      <Table.Row key={session.id}>
                        <Table.Cell>
                          {moment(session.date).fromNow()}
                        </Table.Cell>
                        <Table.Cell>{session.location}</Table.Cell>
                        <Table.Cell>{session.min_players}</Table.Cell>
                        <Table.Cell>{session.rsvps.length}</Table.Cell>
                        <Table.Cell>
                          <a
                            href="#"
                            onClick={() => this.handleShowSession(session)}
                          >
                            {session.status}
                          </a>
                        </Table.Cell>
                        <Table.Cell>
                          {moment(session.expiration_date_time).fromNow()}
                        </Table.Cell>
                        <Table.Cell>
                          {session.rsvps.map(rsvp => {
                            if (rsvp.user_id === user.id) {
                              return (
                                <a
                                  onClick={() =>
                                    this.setState({
                                      currentRsvp: rsvp,
                                      currentSession: session,
                                      formToShow: "editRsvp"
                                    })
                                  }
                                  href="#"
                                >
                                  {rsvp.status}
                                </a>
                              );
                            }
                          })}
                          {session.rsvps.filter(rsvp => {
                            return rsvp.user_id === user.id;
                          }).length === 0 ? (
                            <a
                              onClick={() =>
                                this.setState({
                                  formToShow: "newRsvp",
                                  currentSession: session
                                })
                              }
                              href="#"
                            >
                              RSVP
                            </a>
                          ) : null}
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            </Table>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            This Group's Users
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Table compact fixed striped singleLine size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Age</Table.HeaderCell>
                  <Table.HeaderCell>Height</Table.HeaderCell>
                  <Table.HeaderCell>Highest Experience</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users.map(user => {
                  return (
                    <Table.Row key={user.id}>
                      <Table.Cell>
                        {user.first_name + " " + user.last_name}
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phone_number}</Table.Cell>
                      <Table.Cell>{user.location}</Table.Cell>
                      <Table.Cell>{user.age}</Table.Cell>
                      <Table.Cell>{user.height_in_inches} inches</Table.Cell>
                      <Table.Cell>{user.highest_experience}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Accordion.Content>
        </Accordion>
        <GroupFeed groupFeed={this.state.groupFeed} />
      </React.Fragment>
    );
  }
}
