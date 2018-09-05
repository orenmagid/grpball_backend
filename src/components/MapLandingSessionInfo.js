import React, { Component } from "react";
import moment from "moment";
import RsvpsTable from "./RsvpsTable";
import { Card, Statistic, Label, Icon } from "semantic-ui-react";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball-backend.herokuapp.com/api/v1";

export default class MapLandingSessionInfo extends Component {
  state = {
    statusToDisplay: ""
  };

  handleShowStatus = (e, statusToDisplay, rsvps = []) => {
    e.preventDefault();
    if (this.state.statusToDisplay === statusToDisplay) {
      this.setState({
        statusToDisplay: "",
        rsvps: []
      });
    } else {
      this.setState({
        statusToDisplay: statusToDisplay,
        rsvps: rsvps
      });
    }
  };

  render() {
    const {
      session,
      group,

      handleCloseClick
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
        return null;
    }
    return (
      <React.Fragment>
        <i className="window close icon" onClick={handleCloseClick} />
        <Card fluid>
          {label}

          <Card.Content>
            <Card.Header>Group: {group.name}</Card.Header>
            <Card.Header>
              {moment(session.date).format("MMMM Do YYYY, [at] h:mm a")}, at{" "}
              {session.location}
            </Card.Header>

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
                <Statistic.Value> {delayedRsvps.length}</Statistic.Value>
              </Statistic>
              <Statistic size="mini">
                <Statistic.Label>No Response</Statistic.Label>
                <Statistic.Value>
                  <Icon name="question" />{" "}
                </Statistic.Value>
              </Statistic>
            </Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}
