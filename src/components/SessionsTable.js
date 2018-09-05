import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";

const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "https://grpball.herokuapp.com/api/v1";

export default class SessionsTable extends Component {
  render() {
    const { group, sessions, user, handleShowSession } = this.props;

    let sortedSessions = sessions.sort(
      (a, b) => moment(a.date) - moment(b.date)
    );

    console.log("sessions", sessions);
    console.log("sortedSessions", sortedSessions);

    return (
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
                            {rsvp.status}
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
    );
  }
}
