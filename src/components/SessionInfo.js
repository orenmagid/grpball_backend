import React, { Component } from "react";
import moment from "moment";
import { Card, Statistic, Label, Icon } from "semantic-ui-react";

export default class SessionInfo extends Component {
  render() {
    const {
      session,
      group,
      rsvp,
      user,
      handleCloseClick,
      handleRsvpClick
    } = this.props;

    const acceptedRsvps = session.rsvps.filter(rsvp => {
      return rsvp.status === "Accepted";
    });

    const declinedRsvps = session.rsvps.filter(rsvp => {
      return rsvp.status === "Declined";
    });

    const delayedRsvps = session.rsvps.filter(rsvp => {
      return rsvp.status === "Delayed";
    });

    const numOfPlayersNeeded = session.min_players - acceptedRsvps.length;
    const playerOrPlayers = numOfPlayersNeeded > 1 ? "players" : "player";
    const sessionCreator = group.users.find(user => {
      return user.id === session.creator_id;
    });

    let label;

    switch (session.status) {
      case "Pending":
        label = (
          <Label as="a" color="orange" ribbon>
            {session.status} ({numOfPlayersNeeded} more {playerOrPlayers}{" "}
            needed!)
          </Label>
        );

        break;
      case "Confirmed":
        label = (
          <Label as="a" color="green" ribbon>
            {session.status} (We're on!)
          </Label>
        );

        break;
      case "Cancelled":
        label = (
          <Label as="a" color="red" ribbon>
            {session.status} (It's a no-go!)
          </Label>
        );

        break;
      default:
        null;
    }
    return (
      <React.Fragment>
        <i className="window close icon" onClick={handleCloseClick} />
        <Card fluid>
          {label}

          <Card.Content>
            <Card.Header>
              {moment(session.date).format("MMMM Do YYYY, [at] h:mm a")}, at{" "}
              {session.location}
            </Card.Header>
            <Card.Meta>
              {" "}
              Created by:{" "}
              {sessionCreator.id === user.id
                ? "You"
                : sessionCreator.first_name}
            </Card.Meta>

            <Card.Description>
              <Statistic size="mini">
                <Statistic.Label>Attending</Statistic.Label>
                <Statistic.Value>{acceptedRsvps.length}</Statistic.Value>
              </Statistic>

              <Statistic size="mini">
                <Statistic.Label>Not Attending</Statistic.Label>
                <Statistic.Value>{declinedRsvps.length}</Statistic.Value>
              </Statistic>

              <Statistic size="mini">
                <Statistic.Label>Not Sure</Statistic.Label>
                <Statistic.Value>{delayedRsvps.length}</Statistic.Value>
              </Statistic>
              <Statistic size="mini">
                <Statistic.Label>No Response</Statistic.Label>
                <Statistic.Value>
                  {group.users.length - session.rsvps.length}
                </Statistic.Value>
              </Statistic>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {rsvp ? (
              <a href="#" onClick={() => handleRsvpClick(rsvp)}>
                <Icon name="write" />
                {rsvp.status}
              </a>
            ) : (
              <a href="#" onClick={() => handleRsvpClick()}>
                <Icon name="write" />
                RSVP
              </a>
            )}
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}
