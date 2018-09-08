import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon, Message } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import { baseUrl } from "../constants";

export default class NotificationsDashboard extends Component {
  componentDidMount() {
    this.props.handleFetchGroups();
  }
  handleCloseClick = request => {
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/requests/${request.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "Resolved" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(request => {
        this.props.handleForceUserUpdate();
      });
  };

  render() {
    let groups = this.props.groups;
    let userNotifications = this.props.userNotifications;
    let requestsSortedByDate = this.props.user.requests.sort((a, b) => {
      return moment(b.updated_at) - moment(a.updated_at);
    });

    let requestsReceivedMessages = [];
    let requestsSentMessages = [];

    let unfilteredRequestsSentMessages = requestsSortedByDate.map(request => {
      let group = groups.find(group => {
        return group.id === request.group_id;
      });
      if (group) {
        switch (request.status) {
          case "New":
            return (
              <Message warning key={request.id}>
                <i
                  className="window close icon"
                  onClick={e => this.handleCloseClick(request)}
                />
                <Message.Header>
                  Your request has been sent to <b>{group.name}</b>.
                </Message.Header>
                <p>
                  {moment(request.updated_at).calendar()}, you requested to join{" "}
                  <b>{group.name}</b>. We'll update you once they respond.
                </p>
              </Message>
            );
          case "Accepted":
            return (
              <Message positive key={request.id}>
                <i
                  className="window close icon"
                  onClick={e => this.handleCloseClick(request)}
                />
                <Message.Header>
                  <b>{group.name}</b> has accepted your request.
                </Message.Header>
                <p>
                  As of{" "}
                  {moment(request.updated_at)
                    .calendar()
                    .toLowerCase()}, you are now a member of <b>{group.name}</b>.
                </p>
              </Message>
            );
          case "Denied":
            return (
              <Message negative key={request.id}>
                <i
                  className="window close icon"
                  onClick={e => this.handleCloseClick(request)}
                />
                <Message.Header>
                  <b>{group.name}</b> has denied your request.
                </Message.Header>
                <p>
                  We're sorry about this. Feel free to start your own group and
                  invite others to join!
                </p>
              </Message>
            );
          default:
        }
      }
    });

    let adminUserGroups = this.props.user.user_groups.filter(user_group => {
      return user_group.is_administrator;
    });

    console.log("adminUserGroups", adminUserGroups);

    let adminGroups;
    console.log("groups", groups);

    if (adminUserGroups && groups.length > 0) {
      adminGroups = adminUserGroups.map(adminUserGroup => {
        console.log("adminUserGroup.group_id", adminUserGroup.group_id);
        console.log("groups", groups);
        let group = groups.find(group => {
          console.log("group.id", group.id);

          return group.id === adminUserGroup.group_id;
        });
        return group;
      });

      console.log("adminGroups", adminGroups);

      let unfilteredRequestsReceivedMessages = adminGroups.map(adminGroup => {
        return adminGroup.requests.map(request => {
          switch (request.status) {
            case "New":
              return (
                <Message info key={request.id}>
                  <i
                    className="window close icon"
                    onClick={e => this.handleCloseClick(request)}
                  />
                  <Message.Header>
                    New Request for <b>{adminGroup.name}</b>.
                  </Message.Header>
                  <p>
                    {moment(request.updated_at).calendar()}, a user requested to
                    join <b>{adminGroup.name}</b>. Because you are an
                    administrator, you can accept or deny this request in the
                    "Your Groups" tab.
                  </p>
                </Message>
              );
            case "Accepted":
              return null;
            case "Denied":
              return null;
            default:
          }
        });
      });
      console.log(
        "unfilteredRequestsReceivedMessages",
        unfilteredRequestsReceivedMessages
      );
      requestsReceivedMessages = unfilteredRequestsReceivedMessages.filter(
        message => {
          return message !== undefined && message[0] !== undefined;
        }
      );
    }

    requestsSentMessages = unfilteredRequestsSentMessages.filter(message => {
      console.log("message", message);
      return message !== undefined && message[0] !== undefined;
    });

    console.log("requestsReceivedMessages", requestsReceivedMessages);
    console.log("requestsSentMessages", requestsSentMessages);
    return (
      <React.Fragment>
        {requestsReceivedMessages ? requestsReceivedMessages : null}
        {requestsSentMessages ? requestsSentMessages : null}
        {requestsSentMessages.length === 0 &&
        requestsReceivedMessages.length === 0 ? (
          <Message>
            <Message.Header>You have no new notifications</Message.Header>
            <p>But here's where they'll be when you do.</p>
          </Message>
        ) : null}

        <Feed>
          {userNotifications.map(notification => {
            return notification.activities.map(activity => {
              return (
                <Feed.Event key={notification.id}>
                  <Feed.Label>
                    <Icon name="alarm" />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>
                        {activity.actor.name || activity.actor.first_name}
                      </Feed.User>{" "}
                      {activity.verb}{" "}
                      {activity.foreign_id.startsWith("UserGroup")
                        ? activity.object.name
                        : null}
                      {activity.foreign_id.startsWith("Session") &&
                      activity.object.status
                        ? `(${activity.object.status.toLowerCase()}) at ${
                            activity.object.location
                          }, ${moment(activity.object.date).format(
                            "[on ]MMM Do YYYY, [at] h:mm a"
                          )}`
                        : null}
                      {activity.foreign_id.startsWith("Rsvp") &&
                      activity.object.status
                        ? `for a session (${activity.object.status.toLowerCase()}) at ${
                            activity.object.location
                          }, ${moment(activity.object.date).format(
                            "[on ]MMM Do YYYY, [at] h:mm a"
                          )}`
                        : null}
                    </Feed.Summary>
                    {/* <Feed.Meta>
                      <Feed.Like>
                        <Icon name="like" />
                        4 Likes
                      </Feed.Like>
                    </Feed.Meta> */}
                  </Feed.Content>
                </Feed.Event>
              );
            });
          })}
        </Feed>
      </React.Fragment>
    );
  }
}
