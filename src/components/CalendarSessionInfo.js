import React, { Component } from "react";
import moment from "moment";
import RsvpsTable from "./RsvpsTable";
import { Card, Statistic, Label, Icon } from "semantic-ui-react";

import { baseUrl } from "../constants";

export default class CalendarSessionInfo extends Component {
  state = {
    statusToDisplay: "",
    rsvps: [],
    group: [],
    users: []
  };

  componentDidMount() {
    this.fetchGroup();
  }

  fetchGroup = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${this.props.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(group => {
          this.setState({
            group: group,
            users: group.users
          });
        });
    }
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
      handleShowGroupFromSession,
      rsvp,
      user,
      handleCloseClick,
      handleRsvpClick
    } = this.props;

    const group =
      this.state.group.id !== this.props.group.id
        ? this.props.group
        : this.state.group;

    const groupUsers = this.state.users
      ? this.state.users
      : this.props.group.users;

    console.log("groupUsers", groupUsers);
    let memberOfGroup = groupUsers.findIndex(groupUser => {
      return groupUser.id === user.id;
    });

    console.log("memberOfGroup", memberOfGroup);

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
    const sessionCreator = groupUsers.find(user => {
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
        <Card fluid>
          <i className="window close outline icon" onClick={handleCloseClick} />
          {label}

          <Card.Content>
            <Card.Header>
              Group:{" "}
              {memberOfGroup === -1 && !rsvp ? (
                <a
                  href="group"
                  onClick={e => handleShowGroupFromSession(e, group)}
                >
                  {group.name}
                </a>
              ) : (
                group.name
              )}
            </Card.Header>
            <Card.Header>
              {moment(session.date).format("MMMM Do YYYY, [at] h:mm a")}
              <br />
              {session.location}
            </Card.Header>
            {/* <Card.Meta>
              {" "}
              Created by:{" "}
              {sessionCreator.id === user.id
                ? "You"
                : sessionCreator.first_name}
            </Card.Meta> */}

            <Card.Description>
              {session.status !== "Cancelled" ? (
                <React.Fragment>
                  <Statistic size="mini">
                    <Statistic.Label>Attending</Statistic.Label>
                    <Statistic.Value>
                      {acceptedRsvps.length > 0 && memberOfGroup > -1 ? (
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
                      {declinedRsvps.length > 0 && memberOfGroup > -1 ? (
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
                      {delayedRsvps.length > 0 && memberOfGroup > -1 ? (
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
                      {groupUsers.length - session.rsvps.length > 0 &&
                      memberOfGroup > -1 ? (
                        <a
                          onClick={e =>
                            this.handleShowStatus(e, "none", session.rsvps)
                          }
                          href="none"
                        >
                          {groupUsers.length - session.rsvps.length}
                        </a>
                      ) : (
                        groupUsers.length - session.rsvps.length
                      )}
                    </Statistic.Value>
                  </Statistic>{" "}
                </React.Fragment>
              ) : (
                "It's a shame, but this session was cancelled."
              )}
            </Card.Description>
          </Card.Content>
          <RsvpsTable
            statusToDisplay={this.state.statusToDisplay}
            rsvps={this.state.rsvps}
            users={groupUsers}
            session={session}
          />
          <Card.Content extra>
            {rsvp && session.status !== "Cancelled" ? (
              <a href="rsvp" onClick={e => handleRsvpClick(e, rsvp)}>
                <Icon name="write" />
                {rsvp.status === "Accepted" ? "Attending" : null}
                {rsvp.status === "Declined" ? "Not Attending" : null}
                {rsvp.status === "Delayed" ? "Not Sure" : null}
              </a>
            ) : null}
            {memberOfGroup > -1 && !rsvp && session.status !== "Cancelled" ? (
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
