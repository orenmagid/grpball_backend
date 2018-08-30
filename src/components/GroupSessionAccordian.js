import React, { Component } from "react";
import { Accordion, Icon, Grid, Table, Popup, Button } from "semantic-ui-react";
import moment from "moment";
import Sessions from "./Sessions";
import RsvpForm from "./RsvpForm";
const baseUrl = "http://localhost:3000/api/v1";

export default class GroupSessionAccordian extends Component {
  state = {
    activeIndex: 0
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleNewRsvp = (e, sessionId) => {
    e.preventDefault();

    let data = {
      user_id: this.props.user.id,
      session_id: sessionId,
      status: e.target.status.value,
      other_text: e.target.otherText.value
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/rsvps`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => this.handleFetchSessions());
  };

  render() {
    const { activeIndex } = this.state;
    const { sessions, group } = this.props;
    const { user } = this.props;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          This Groups Sessions
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Table compact singleLine size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Group</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Min # of Players</Table.HeaderCell>
                <Table.HeaderCell># of RSVPs</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Automatic Expiration</Table.HeaderCell>
                <Table.HeaderCell>RSVP</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sessions.map(session => {
                if (session.group_id === group.id) {
                  return (
                    <Table.Row key={session.id}>
                      <Table.Cell>{session.group.name}</Table.Cell>
                      <Table.Cell>{moment(session.date).fromNow()}</Table.Cell>
                      <Table.Cell>{session.location}</Table.Cell>
                      <Table.Cell>{session.min_players}</Table.Cell>
                      <Table.Cell>{session.rsvps.length}</Table.Cell>
                      <Table.Cell>{session.status}</Table.Cell>
                      <Table.Cell>
                        {moment(session.expiration_date_time).fromNow()}
                      </Table.Cell>
                      <Table.Cell>
                        {session.rsvps.map(rsvp => {
                          if (rsvp.user_id === user.id) {
                            return rsvp.status === "Accepted"
                              ? `${rsvp.status}`
                              : null;
                          }
                        })}
                        {session.rsvps.filter(rsvp => {
                          return rsvp.user_id === user.id;
                        }).length === 0 ? (
                          <Popup
                            trigger={
                              <Button mini basic secondary circular>
                                RSVP
                              </Button>
                            }
                            on="click"
                            basic
                          >
                            <RsvpForm
                              session={session}
                              handleNewRsvp={this.handleNewRsvp}
                            />
                          </Popup>
                        ) : null}
                      </Table.Cell>
                    </Table.Row>
                  );
                }
              })}
            </Table.Body>
          </Table>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          What kinds of dogs are there?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            There are many breeds of dogs. Each breed varies in size and
            temperament. Owners often select a breed of dog that they find to be
            compatible with their own lifestyle and desires from a companion.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          How do you acquire a dog?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}
