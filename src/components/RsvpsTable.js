import React, { Component } from "react";
import { Table } from "semantic-ui-react";

export default class RsvpsTable extends Component {
  userRsvpd = user => {
    return this.props.rsvps.find(rsvp => rsvp.user_id === user.id);
  };

  render() {
    const { statusToDisplay, rsvps, users } = this.props;

    let noRsvpUsers = users.filter(user => {
      return !this.userRsvpd(user);
    });

    console.log("noRsvpUsers", noRsvpUsers);
    console.log("rsvps", rsvps);

    if (
      statusToDisplay === "accepted" ||
      statusToDisplay === "declined" ||
      statusToDisplay === "delayed"
    ) {
      return (
        <Table compact fixed striped singleLine size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Other</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rsvps.map(rsvp => {
              let user = users.find(user => user.id === rsvp.user_id);
              return (
                <Table.Row key={rsvp.id}>
                  <Table.Cell>
                    {user ? user.first_name + " " + user.last_name : null}
                  </Table.Cell>
                  <Table.Cell>{rsvp.status}</Table.Cell>

                  <Table.Cell>{rsvp.other_text}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    }
    if (statusToDisplay === "none") {
      return (
        <Table compact fixed striped singleLine size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users
              .filter(user => {
                return !rsvps.find(rsvp => rsvp.user_id === user.id);
              })
              .map(user => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      {user.first_name + " " + user.last_name}
                    </Table.Cell>
                    <Table.Cell>Total Loser</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      );
    }
    return null;
  }
}
