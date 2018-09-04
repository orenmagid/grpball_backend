import React, { Component } from "react";
import Calendar from "react-big-calendar";
import { Segment } from "semantic-ui-react";
import moment from "moment";
import CalendarSessionInfo from "../components/CalendarSessionInfo";
import InteractiveSegment from "../components/InteractiveSegment";
import SessionScheduler from "../components/SessionScheduler";

import "react-big-calendar/lib/css/react-big-calendar.css";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball.herokuapp.com/api/v1/";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class CalendarDashboard extends Component {
  state = {
    start: "",
    end: "",
    selectedEvent: null,
    currentRsvp: "",
    formToShow: "none"
  };

  handleSelect = ({ start, end }) => {
    this.setState({
      formToShow: "suggestSession",
      start: start,
      end: end
    });
  };

  handleSelectEvent = event => {
    if (this.state.selectedEvent && this.state.selectedEvent.id === event.id) {
      this.setState({ selectedEvent: null });
    } else {
      let myRsvp = event.rsvps.find(
        rsvp => rsvp.user_id === this.props.user.id
      );
      this.setState({
        selectedEvent: event,
        currentRsvp: myRsvp
      });
    }
  };

  handleSessionCloseClick = () => {
    this.setState({
      selectedEvent: null
    });
  };

  handleCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  handleRsvpClick = (e, rsvp = null) => {
    e.preventDefault();
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

  handleNewRsvp = (e, sessionId) => {
    console.log("Inside handleNewRsvp");
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
        this.handleShowSession(this.state.selectedEvent);
        this.props.handleFetchSessions();
      });
  };

  handleEditRsvp = (e, sessionId, otherText) => {
    console.log("Inside handleEditRsvp");
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
        this.handleShowSession(this.state.selectedEvent);
        this.handleFormCloseClick();
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

          this.setState({
            selectedEvent: session,
            currentRsvp: myRsvp
          });
        });
    }
  };

  handleFormCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.selectedEvent ? (
          <CalendarSessionInfo
            group={this.state.selectedEvent.group}
            handleCloseClick={this.handleSessionCloseClick}
            handleRsvpClick={this.handleRsvpClick}
            session={this.state.selectedEvent}
            rsvp={this.state.currentRsvp}
            user={this.props.user}
          />
        ) : null}
        {this.state.formToShow === "editRsvp" ||
        this.state.formToShow === "newRsvp" ? (
          <InteractiveSegment
            handleCloseClick={this.handleFormCloseClick}
            formToShow={this.state.formToShow}
            session={this.state.selectedEvent}
            rsvp={this.state.currentRsvp}
            handleEditRsvp={this.handleEditRsvp}
            handleNewRsvp={this.handleNewRsvp}
            group={this.state.group}
          />
        ) : null}
        {this.state.formToShow === "suggestSession" ? (
          <SessionScheduler
            date={this.state.start}
            handleCloseClick={this.handleCloseClick}
            user={this.props.user}
            handleFetchSessions={this.props.handleFetchSessions}
          />
        ) : null}
        <Segment>
          <Calendar
            startAccessor={({ date }) => new Date(moment(date))}
            endAccessor={({ date }) => new Date(moment(date).add(3, "hours"))}
            titleAccessor={({ location, group, status }) =>
              `${group.name}, at ${location}: ${status}`
            }
            selectable
            popup
            defaultDate={new Date()}
            defaultView="month"
            events={this.props.sessions}
            style={{ height: "80vh", padding: "5px" }}
            onSelectEvent={event => this.handleSelectEvent(event)}
            onSelectSlot={this.handleSelect}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default CalendarDashboard;
