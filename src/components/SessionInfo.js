import React, { Component } from "react";
import moment from "moment";
import RsvpsTable from "./RsvpsTable";
import { Card, Statistic, Label, Icon } from "semantic-ui-react";

export default class SessionInfo extends Component {
  state = {
    statusToDisplay: "",
    rsvps: []
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

    console.log("acceptedRsvps", acceptedRsvps);
    console.log("declinedRsvps", declinedRsvps);
    console.log("delayedRsvps", delayedRsvps);

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
                <Statistic.Value>
                  {acceptedRsvps.length > 0 ? (
                    <a
                      onClick={e =>
                        this.handleShowStatus(e, "accepted", acceptedRsvps)
                      }
                      href="accepted"
                    >
                      {acceptedRsvps.length}
                    </a>
                  ) : (
                    acceptedRsvps.length
                  )}
                </Statistic.Value>
              </Statistic>

              <Statistic size="mini">
                <Statistic.Label>Not Attending</Statistic.Label>
                <Statistic.Value>
                  {declinedRsvps.length > 0 ? (
                    <a
                      onClick={e =>
                        this.handleShowStatus(e, "declined", declinedRsvps)
                      }
                      href="declined"
                    >
                      {declinedRsvps.length}
                    </a>
                  ) : (
                    declinedRsvps.length
                  )}
                </Statistic.Value>
              </Statistic>

              <Statistic size="mini">
                <Statistic.Label>Not Sure</Statistic.Label>
                <Statistic.Value>
                  {" "}
                  {delayedRsvps.length > 0 ? (
                    <a
                      onClick={e =>
                        this.handleShowStatus(e, "delayed", delayedRsvps)
                      }
                      href="delayed"
                    >
                      {delayedRsvps.length}
                    </a>
                  ) : (
                    delayedRsvps.length
                  )}
                </Statistic.Value>
              </Statistic>
              <Statistic size="mini">
                <Statistic.Label>No Response</Statistic.Label>
                <Statistic.Value>
                  {group.users.length - session.rsvps.length > 0 ? (
                    <a
                      onClick={e =>
                        this.handleShowStatus(e, "none", session.rsvps)
                      }
                      href="none"
                    >
                      {group.users.length - session.rsvps.length}
                    </a>
                  ) : (
                    group.users.length - session.rsvps.length
                  )}
                </Statistic.Value>
              </Statistic>
            </Card.Description>
          </Card.Content>
          <RsvpsTable
            statusToDisplay={this.state.statusToDisplay}
            rsvps={this.state.rsvps}
            users={group.users}
            session={session}
          />
          <Card.Content extra>
            {rsvp && session.status !== "Cancelled" ? (
              <a href="rsvp" onClick={e => handleRsvpClick(e, rsvp)}>
                <Icon name="write" />
                {rsvp.status}
              </a>
            ) : null}
            {!rsvp && session.status !== "Cancelled" ? (
              <a href="rsvp" onClick={e => handleRsvpClick(e)}>
                <Icon name="write" />
                RSVP
              </a>
            ) : null}
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}
