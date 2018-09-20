import React from "react";
import { Feed, Icon, Segment } from "semantic-ui-react";
import moment from "moment";

const UserFeed = ({ userFeed }) => (
  <Segment>
    <Feed>
      {userFeed.map(feed => {
        return (
          <Feed.Event key={feed.id}>
            <Feed.Label>
              <Icon name="basketball ball" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>{moment(feed.time).calendar()}</Feed.Date>
              <Feed.Summary>
                <Feed.User>You </Feed.User> {feed.verb}{" "}
                {feed.foreign_id.startsWith("UserGroup")
                  ? feed.object.name
                  : null}
                {feed.foreign_id.startsWith("Session") && feed.object.status
                  ? `(${feed.object.status.toLowerCase()}) at ${
                      feed.object.location
                    }, ${moment(feed.object.date).format(
                      "[on ]MMM Do YYYY, [at] h:mm a"
                    )}`
                  : null}
                {feed.foreign_id.startsWith("Rsvp") && feed.object.status
                  ? `for a session (${feed.object.status.toLowerCase()}) at ${
                      feed.object.location
                    }, ${moment(feed.object.date).format(
                      "[on ]MMM Do YYYY, [at] h:mm a"
                    )}`
                  : null}
              </Feed.Summary>
              <Feed.Meta>
                {/* <Feed.Like>
                <Icon name="like" />
                4 Likes
              </Feed.Like> */}
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        );
      })}
    </Feed>
  </Segment>
);

export default UserFeed;

// foreign_id: "Rsvp:9"
// id: "2d63b480-adf2-11e8-8080-80014b76925d"
// object:
// created_at:
// "2018-09-01T14:20:29.519Z"
// date:
// "2018-10-06T15:15:00.000Z"
// expiration_date_time:
// "2018-09-04T15:00:00.000Z"
// group_id:
// 1
// id:
// 3
// location:
// "Rose Park"
// min_players:
// 6
// status:
// "Pending"
// updated_at:
// "2018-09-01T14:20:29.519Z"
// origin: null
// target: ""
// time: "2018-09-01T14:20:29.000000"
// verb: "RSVP'd"
