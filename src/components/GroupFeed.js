import React from "react";
import { Feed, Icon } from "semantic-ui-react";
import moment from "moment";

const GroupFeed = ({ groupFeed }) => (
  <Feed size="small">
    {groupFeed.map(feed => {
      return (
        <Feed.Event key={feed.id}>
          <Feed.Label>
            <Icon name="basketball ball" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>{moment(feed.time).calendar()}</Feed.Date>
            <Feed.Summary>
              <Feed.User>{feed.actor.name || feed.actor.first_name}</Feed.User>{" "}
              {feed.verb} ({feed.object.status.toLowerCase()}) at{" "}
              {feed.object.location},{" "}
              {moment(feed.object.date).format("[on ]MMM Do YYYY, [at] h:mm a")}
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
);

export default GroupFeed;

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
