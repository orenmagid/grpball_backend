import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Dropdown, Divider, Form, Input, Select } from "semantic-ui-react";
import Sessions from "../components/Sessions";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const baseUrl = "http://localhost:3000/api/v1";

export default class SchedulingDashboard extends Component {
  state = {
    sessions: []
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

    const options = groups.map(group => {
      return { key: group.id, text: group.name, value: group.id };
    });

    return (
      <React.Fragment>
        <Sessions
          user={this.props.user}
          fetchSessions={this.fetchSessions}
          sessions={sessions}
        />
      </React.Fragment>
    );
  }
}
