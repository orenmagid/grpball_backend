import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon, Message } from "semantic-ui-react";
import ChatComponent from "../components/ChatComponent";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import { baseUrl } from "../constants";

export default class ConversationsDashboard extends Component {
  componentDidMount() {
    this.props.handleFetchGroups();
  }

  render() {
    return (
      <React.Fragment>
        <Message>
          <Message.Header>Group Chats</Message.Header>

          <p>
            For now, conversations are only enabled among groups. Each group has
            it's own conversation, in which only group members can participate.
          </p>
          {this.props.user.user_groups.length === 0 ? (
            <p>Once you join a group, you'll be able to chat with them here.</p>
          ) : null}
        </Message>
        <ChatComponent user={this.props.user} groups={this.props.groups} />
      </React.Fragment>
    );
  }
}
