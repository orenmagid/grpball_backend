import React, { Component } from "react";
import { Accordion, Icon, List } from "semantic-ui-react";
import moment from "moment";

import InteractiveSegment from "../components/InteractiveSegment";
import SessionsTable from "../components/SessionsTable";
import InfoSegment from "../components/InfoSegment";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball.herokuapp.com/api/v1/";

export default class GroupSubDashboard extends Component {
  state = {
    group: null,
    users: [],
    currentRsvp: "",
    currentSession: null,
    displayedUser: null,
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
        this.handleShowSession(e, this.state.currentSession);
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
        this.handleShowSession(e, this.state.currentSession);
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
      currentSession: null,
      displayedUser: null
    });
  };

  handleShowSession = (e, currentSession) => {
    e.preventDefault();
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
            currentRsvp: myRsvp,
            displayedUser: null
          });
        });
    }
  };

  handleRsvpClick = (e, rsvp = null) => {
    e.preventDefault();
    if (this.state.formToShow !== "none") {
      this.setState({
        formToShow: "none"
      });
    } else if (rsvp) {
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

  handleDisplayUser = (e, user) => {
    e.preventDefault();
    this.setState({
      displayedUser: user,
      currentSession: null
    });
  };

  render() {
    const { users, formToShow, currentSession, displayedUser } = this.state;
    const {
      activeIndex,
      handleAccordianDisplay,
      handleClick,
      sessions,
      group,
      user
    } = this.props;

    return (
      <React.Fragment>
        {currentSession || displayedUser ? (
          <InfoSegment
            handleRsvpClick={this.handleRsvpClick}
            handleCloseClick={this.handleSessionCloseClick}
            session={this.state.currentSession}
            rsvp={this.state.currentRsvp}
            group={this.state.group}
            user={user}
            displayedUser={displayedUser}
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
            onClick={e => handleAccordianDisplay(e, 0)}
          >
            <Icon name="dropdown" />
            This Group's Sessions
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {group.sessions && group.sessions.length > 0 ? (
              <SessionsTable
                group={group}
                sessions={sessions}
                user={user}
                handleShowSession={this.handleShowSession}
              />
            ) : (
              "No sessions yet! Schedule one by clicking 'Suggest Session' above."
            )}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={e => handleAccordianDisplay(e, 1)}
          >
            <Icon name="dropdown" />
            This Group's Users
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List horizontal>
              {users.map(user => {
                return (
                  <List.Item key={user.id}>
                    <a
                      onClick={e => this.handleDisplayUser(e, user)}
                      href="show_user"
                    >
                      {user.first_name + " " + user.last_name}{" "}
                    </a>
                  </List.Item>
                );
              })}
            </List>
          </Accordion.Content>
        </Accordion>
        {/* <GroupFeed groupFeed={this.state.groupFeed} /> */}
      </React.Fragment>
    );
  }
}
