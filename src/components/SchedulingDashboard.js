import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Dropdown, Divider } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const baseUrl = "http://localhost:3000/api/v1";

export default class SchedulingDashboard extends Component {
  state = {
    date: moment(),
    startTime: moment(),
    endTime: moment(),
    groupId: "",
    sessions: []
  };

  handleSelectDate = date => {
    console.log("inside handleSelect, date:", date);
    this.setState({
      date: date
    });
  };

  handleSelectStartTime = date => {
    console.log("inside handleSelectStartTime, date:", date);
    this.setState({
      startTime: date
    });
  };

  handleSelectEndTime = date => {
    console.log("inside handleSelectEndTime, date:", date);
    this.setState({
      endTime: date
    });
  };

  handleGroupChange = (e, { value }) => this.setState({ groupId: value });

  handleClick = () => {
    let data = {
      session: {
        group_id: this.state.groupId,
        date: this.state.date.format("MMMM Do YYYY"),
        start_time: moment(this.state.startTime.format("h:mm a"), [
          "h:m a",
          "H:m"
        ]),
        end_time: moment(this.state.endTime.format("h:mm a"), ["h:m a", "H:m"])
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
          console.log(session);
          // this.props.handleForceUpdate();
        });
    }
  };

  componentDidMount() {
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
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    let groups = this.props.user.groups;
    const { value } = this.state;

    const options = groups.map(group => {
      return { key: group.id, text: group.name, value: group.id };
    });

    return (
      <React.Fragment>
        <h3 classame="ui header centered">Schedule a Session</h3>
        <div className="ui three column doubling stackable grid container">
          <div className="row">
            <div className="ui container">
              <h4 classame="ui header">Select a Group</h4>
              <Dropdown
                onChange={this.handleGroupChange}
                options={options}
                placeholder="Choose an option"
                selection
                value={value}
              />
            </div>
          </div>
          <div className="column">
            <h4 classame="ui header">Select a Date</h4>
            <DatePicker
              selected={this.state.date}
              onSelect={this.handleSelectDate}
            />
          </div>

          <div className="column">
            <h4 classame="ui header">Select a Start Time</h4>
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleSelectStartTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
            />
          </div>
          <div className="column">
            <h4 classame="ui header">Select an End Time</h4>
            <DatePicker
              selected={this.state.endTime}
              onChange={this.handleSelectEndTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
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
        <h3 classame="ui header centered">Your Sessions</h3>
        <div className="ui three column doubling stackable grid container">
          <div className="row">
            <div className="ui container" />
          </div>
          <div className="column" />

          <div className="column" />
          <div className="column" />
        </div>
        <div className="ui container" />
      </React.Fragment>
    );
  }
}
