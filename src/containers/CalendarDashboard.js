import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import CalendarSessionInfo from "../components/CalendarSessionInfo";

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class CalendarDashboard extends Component {
  state = {
    selectedEvent: {}
  };
  // handleSelect = ({ start, end }) => {
  //   const title = window.prompt("New Event name");
  //   if (title)
  //     this.setState({
  //       events: [
  //         ...this.state.events,
  //         {
  //           start,
  //           end,
  //           title
  //         }
  //       ]
  //     });
  // };

  handleSelectEvent = event => {
    console.log(event);
  };

  render() {
    return (
      <React.Fragment>
        <CalendarSessionInfo
          group={this.state.selectedEvent.group}
          // handleCloseClick={handleCloseClick}
          // handleRsvpClick={handleRsvpClick}
          session={this.state.selectedEvent}
          // rsvp={rsvp}
          user={this.props.user}
        />
        <Calendar
          startAccessor={({ date }) => new Date(moment(date))}
          endAccessor={({ date }) => new Date(moment(date).add(3, "hours"))}
          titleAccessor={({ location }) => `${location}`}
          selectable
          popup
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.sessions}
          style={{ height: "100vh" }}
          onSelectEvent={event => this.handleSelectEvent(event)}
          onSelectSlot={this.handleSelect}
        />
      </React.Fragment>
    );
  }
}

export default CalendarDashboard;
