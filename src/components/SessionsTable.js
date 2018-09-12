import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";

import { baseUrl } from "../constants";

export default class SessionsTable extends Component {
  render() {
    const { group, user, handleShowSession } = this.props;

    let sessions = this.props.sessions.filter(
      session => session.group_id === group.id
    );

    let sortedSessions = sessions.sort(
      (a, b) => moment(a.date) - moment(b.date)
    );

    console.log("sessions", sessions);
    console.log("sortedSessions", sortedSessions);

    return (
      <React.Fragment>
        {sortedSessions.length > 0 ? (
          <Table compact fixed striped singleLine size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                {/* <Table.HeaderCell>Min Players</Table.HeaderCell>
            <Table.HeaderCell># of RSVPs</Table.HeaderCell> */}
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Expiration</Table.HeaderCell>
                <Table.HeaderCell>Your RSVP</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sortedSessions.map(session => {
                if (session.group_id === group.id) {
                  return (
                    <Table.Row key={session.id}>
                      <Table.Cell>{moment(session.date).fromNow()}</Table.Cell>
                      <Table.Cell>{session.location}</Table.Cell>
                      {/* <Table.Cell>{session.min_players}</Table.Cell>
                  <Table.Cell>{session.rsvps.length}</Table.Cell> */}
                      <Table.Cell>
                        <a
                          href="session"
                          onClick={e => handleShowSession(e, session)}
                        >
                          {session.status}
                        </a>
                      </Table.Cell>
                      <Table.Cell>
                        {moment(session.expiration_date_time).fromNow()}
                      </Table.Cell>
                      <Table.Cell>
                        {session.rsvps.map(rsvp => {
                          if (rsvp.user_id === user.id) {
                            return (
                              <a
                                key={user.id}
                                onClick={e => handleShowSession(e, session)}
                                href="session"
                              >
                                {rsvp.status === "Accepted"
                                  ? "Attending"
                                  : null}
                                {rsvp.status === "Declined"
                                  ? "Not Attending"
                                  : null}
                                {rsvp.status === "Delayed" ? "Not Sure" : null}
                              </a>
                            );
                          }
                        })}
                        {session.rsvps.filter(rsvp => {
                          return rsvp.user_id === user.id;
                        }).length === 0 ? (
                          <a
                            onClick={e => handleShowSession(e, session)}
                            href="session"
                          >
                            RSVP
                          </a>
                        ) : null}
                      </Table.Cell>
                    </Table.Row>
                  );
                }
              })}
            </Table.Body>
          </Table>
        ) : (
          "No sessions yet! Click 'Suggest Session' to schedule one!"
        )}
      </React.Fragment>
    );
  }
}
