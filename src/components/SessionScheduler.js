import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Form, Select, Segment } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball.herokuapp.com/api/v1";

export default class SessionScheduler extends Component {
  state = {
    date: "",
    expiration: "",
    group_id: ""
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

  handleChange = (e, { value }) => this.setState({ group_id: value });

  handleSubmit = e => {
    e.preventDefault();

    let data = {
      session: {
        group_id: this.props.group ? this.props.group.id : this.state.group_id,
        date: this.props.date ? moment(this.props.date) : this.state.date,
        status: "Pending",
        location: e.currentTarget.location.value,
        min_players: 6,
        expiration_date_time: this.state.expiration,
        creator_id: this.props.user.id
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
          this.props.handleCloseClick();
        });
    }
  };

  render() {
    const { date, group, user } = this.props;

    const options = user.groups.map(group => {
      return {
        key: `${group.id}`,
        text: `${group.name}`,
        value: `${group.id}`
      };
    });

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
              options={options}
              placeholder="Group"
              onChange={this.handleChange}
            />
          )}
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
      </Segment>
    );
  }
}
