import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  Dropdown,
  Divider,
  Form,
  Input,
  Select,
  Card,
  Message
} from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const baseUrl = "http://localhost:3000/api/v1";

export default class SessionScheduler extends Component {
  state = {
    date: "",
    expiration: ""
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

  handleGroupChange = (e, { value }) => this.setState({ groupId: value });

  handleSubmit = e => {
    e.preventDefault();

    let data = {
      session: {
        group_id: this.props.group.id,
        date: this.state.date,
        status: "Pending",
        location: e.currentTarget.location.value,
        min_players: 6,
        expiration_date_time: this.state.expiration
      }
    };

    e.target.reset();
    this.setState({
      date: "",
      expiration: ""
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
        });
    }
  };

  render() {
    let groups = this.props.user.groups;
    const { value } = this.state;
    const { sessions } = this.state;

    const options = groups.map(group => {
      return { key: group.id, text: group.name, value: group.id };
    });

    return (
      <Card centered>
        <i
          className="window close icon"
          onClick={this.props.handleCloseClick}
        />
        <Card.Content>
          <h2> Schedule a Session</h2>
          <h4> Session Date and Time</h4>

          <DatePicker
            placeholderText="Click to select"
            selected={this.state.date}
            onChange={this.handleDateChange}
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
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="time"
          />

          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              name="location"
              fluid
              label="Location"
              placeholder="Location"
            />

            <Form.Button secondary basic>
              Submit
            </Form.Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
