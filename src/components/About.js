import React, { Component } from "react";
import { Segment, Header, Accordion, Icon, Divider } from "semantic-ui-react";
import MediaQuery from "react-responsive";

export default class About extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Segment fluid>
        <Header>About GRPBALL</Header>

        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            What is GRPBALL?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>GRPBALL is for individuals, and groups, who play basketball.</p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Individuals
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <MediaQuery maxWidth={767}>
              <p>
                Search for local groups and request to join by clicking on{" "}
                <Icon name="map marker" /> above
              </p>{" "}
              <Divider />
              <p>
                When a group has responded, you'll be notified on the{" "}
                <Icon name="alarm" /> tab above
              </p>{" "}
            </MediaQuery>
            <MediaQuery minWidth={767}>
              <p>
                Search for local groups and request to join them by clicking on
                the <strong>Map</strong> tab above
              </p>{" "}
              <Divider />
              <p>
                When a group has responded, you'll be notified on the{" "}
                <strong>Notifications</strong> tab above
              </p>{" "}
            </MediaQuery>
            <Divider />
            <p>
              Once you join a group, engage with them in all the ways described
              below
            </p>{" "}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Groups
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <MediaQuery maxWidth={767}>
              <p>
                Chat with other members of your group by clicking{" "}
                <Icon name="chat" /> above
              </p>
              <Divider />
              <p>
                Schedule games by clicking <Icon name="users" /> and{" "}
                <Icon name="calendar" /> above
              </p>{" "}
              <Divider />
              <p>
                RSVP for games by clicking <Icon name="users" /> and{" "}
                <Icon name="calendar" /> above
              </p>
              <Divider />
              <p>
                Find more local players and invite them to join your group by
                clicking <Icon name="map marker" /> above
              </p>
            </MediaQuery>
            <MediaQuery minWidth={767}>
              <p>
                Chat with other members of your group by clicking on the{" "}
                <strong>Conversations</strong> tab
              </p>
              <Divider />
              <p>
                Schedule games by clicking on the <strong>Your Groups</strong>{" "}
                and <strong>Calendar </strong> tabs
              </p>{" "}
              <Divider />
              <p>
                RSVP for games by clicking on the <strong>Your Groups</strong>{" "}
                and <strong>Calendar</strong> tabs
              </p>
              <Divider />
              <p>
                Find more local players and invite them to join your group by
                clicking on the <strong>Map </strong> tab
              </p>
            </MediaQuery>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}
