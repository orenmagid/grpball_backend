import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default class NotificationsDashboard extends Component {
  render() {
    // let groups = this.props.user.groups;
    let userNotifications = this.props.userNotifications;

    return (
      <React.Fragment>
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
