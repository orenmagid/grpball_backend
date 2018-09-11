import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Form, Select, Segment } from "semantic-ui-react";
import LocationSearchInput from "./LocationSearchInput";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import { baseUrl } from "../constants";

export default class SessionScheduler extends Component {
  state = {
    date: "",
    expiration: "",
    min_players: "",
    group_id: "",
    address: ""
  };

  captureAddress = address => {
    this.setState({ address: address });
  };

  handleDateChange = date => {
    console.log("inside handleSelect, date:", date);
    this.setState({
      date: date
    });
  };

  handleExpirationChange = date => {
    console.log("inside handleSelect, date:", date);
    this.setState({
      expiration: date
    });
  };

  handleGroupChange = (e, { value }) => this.setState({ group_id: value });

  handlePlayersChange = (e, { value }) => this.setState({ min_players: value });

  // handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    console.log("Inside handleSubmit");
    e.preventDefault();

    let data = {
      session: {
        group_id: this.props.group ? this.props.group.id : this.state.group_id,
        date: this.props.date ? moment(this.props.date) : this.state.date,
        status: "Pending",
        location: this.state.address,
        min_players: this.state.min_players,
        expiration_date_time: this.state.expiration,
        creator_id: this.props.user.id
      }
    };

    e.target.reset();
    this.setState({
      date: "",
      expiration: "",
      location: "",
      min_players: "",
      address: ""
    });
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
          session.errors
            ? alert(session.errors)
            : this.props.handleFetchSessions();
          this.props.handleCloseClick();
        });
    }
  };

  render() {
    const { date, group, user } = this.props;

    const groupOptions = user.groups.map(group => {
      return {
        key: `${group.id}`,
        text: `${group.name}`,
        value: `${group.id}`
      };
    });

    const playersOptions = [
      { key: "4", text: "4", value: 4 },
      { key: "5", text: "5", value: 5 },
      { key: "6", text: "6", value: 6 },
      { key: "7", text: "7", value: 7 },
      { key: "8", text: "8", value: 8 },
      { key: "9", text: "9", value: 9 },
      { key: "10", text: "10", value: 10 }
    ];

    return (
      <Segment>
        <i
          className="window close icon"
          onClick={this.props.handleCloseClick}
        />

        <h2> Schedule a Session</h2>
        <h4> Session Date and Time</h4>

        <DatePicker
          placeholderText="Click to select"
          selected={date ? moment(date) : this.state.date}
          onChange={this.handleDateChange}
          minDate={moment()}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />

        <h4>Expiration Date and Time</h4>
        <DatePicker
          placeholderText="Click to select"
          selected={this.state.expiration}
          onChange={this.handleExpirationChange}
          minDate={moment()}
          maxDate={date ? moment(date) : this.state.date}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />

        <br />
        <Form onSubmit={this.handleSubmit}>
          {group ? null : (
            <Form.Field
              control={Select}
              label="Group"
              options={groupOptions}
              placeholder="Group"
              onChange={this.handleGroupChange}
            />
          )}
          <LocationSearchInput
            type="session"
            captureAddress={this.captureAddress}
          />
          <br />
          <Form.Field
            control={Select}
            label="Minimum Number of Players"
            options={playersOptions}
            placeholder="Minimum Number of Players"
            onChange={this.handlePlayersChange}
          />

          <Form.Button secondary basic>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    );
  }
}
