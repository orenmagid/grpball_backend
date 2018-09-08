import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon, Message } from "semantic-ui-react";
import ChatComponent from "../components/ChatComponent";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import { baseUrl } from "../constants";

export default class NotificationsDashboard extends Component {
  componentDidMount() {
    this.props.handleFetchGroups();
  }

  render() {
    return (
      <React.Fragment>
        <ChatComponent user={this.props.user} />
      </React.Fragment>
    );
  }
}
