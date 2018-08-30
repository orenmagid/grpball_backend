import React, { Component } from "react";

import moment from "moment";
import { Table } from "semantic-ui-react";

export default class Sessions extends Component {
  componentDidMount() {
    this.props.fetchSessions();
  }

  render() {
    let sessions = this.props.sessions;

    return (
      <React.Fragment>
        <h3 classame="ui header">Your Sessions</h3>
        <div className="ui container">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Group</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Min # of Players</Table.HeaderCell>
                <Table.HeaderCell># of RSVPs</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Automatic Expiration</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sessions.length > 0
                ? sessions.map(session => {
                    return (
                      <Table.Row key={session.id}>
                        <Table.Cell>{session.group.name}</Table.Cell>
                        <Table.Cell>
                          {moment(session.date).format("MMMM Do YYYY, h:mm a")}
                        </Table.Cell>
                        <Table.Cell>{session.location}</Table.Cell>
                        <Table.Cell>{session.min_players}</Table.Cell>
                        <Table.Cell>{session.rsvps.length}</Table.Cell>
                        <Table.Cell>{session.status}</Table.Cell>
                        <Table.Cell>
                          {moment(session.expiration_date_time).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                : null}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
