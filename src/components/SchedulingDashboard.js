import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Dropdown, Divider, Table } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const baseUrl = "http://localhost:3000/api/v1";

export default class SchedulingDashboard extends Component {
  state = {
    date: moment(),
    groupId: "",
    sessions: []
  };

  handleDateChange = date => {
    console.log("inside handleSelect, date:", date);
    this.setState({
      date: date
    });
  };

  handleGroupChange = (e, { value }) => this.setState({ groupId: value });

  handleClick = () => {
    let data = {
      session: {
        group_id: this.state.groupId,
        date: this.state.date
      }
    };

    console.log("data", data);
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/sessions`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(session => {
          session.errors ? alert(session.errors) : this.fetchSessions();
        });
    }
  };

  fetchSessions = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "/sessions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ sessions: data });
        });
      // .catch(e => {
      //   alert(e);
      // });
    }
  };

  componentDidMount() {
    this.fetchSessions();
  }

  render() {
    let groups = this.props.user.groups;
    const { value } = this.state;
    const { sessions } = this.state;

    console.log(sessions[0]);

    const options = groups.map(group => {
      return { key: group.id, text: group.name, value: group.id };
    });

    return (
      <React.Fragment>
        <h3 classame="ui header centered">Schedule a Session</h3>
        <div className="ui two column doubling stackable grid container">
          <div className="column">
            <h4 classame="ui header">Select a Group</h4>
            <Dropdown
              onChange={this.handleGroupChange}
              options={options}
              placeholder="Choose an option"
              selection
              value={value}
            />
          </div>

          <div className="column">
            <h4 classame="ui header">Select a Date and Time</h4>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
          </div>
        </div>

        <div className="ui container">
          <button
            onClick={this.handleClick}
            className="ui secondary basic button"
          >
            Schedule Session
          </button>
        </div>
        <Divider />
        <h3 classame="ui header">Your Sessions</h3>
        <div className="ui container">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Group</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Min # of Players</Table.HeaderCell>
                <Table.HeaderCell># of RSVPs</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sessions.length > 0
                ? sessions.map(session => {
                    return (
                      <Table.Row>
                        <Table.Cell>{session.group.name}</Table.Cell>
                        <Table.Cell>
                          {moment(session.date).format("MMMM Do YYYY, h:mm a")}
                        </Table.Cell>
                        <Table.Cell>{session.location}</Table.Cell>
                        <Table.Cell>{session.min_players}</Table.Cell>
                        <Table.Cell>{session.min_players}</Table.Cell>
                      </Table.Row>
                    );
                  })
                : null}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
