import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";

export default class UserMenu extends Component {
  state = {
    activeItem: "your_profile"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    if (window.location.href.includes("group_dashboard")) {
      this.setState({
        activeItem: "your_groups"
      });
    }
    if (window.location.href.includes("calendar")) {
      this.setState({
        activeItem: "calendar"
      });
    }
    if (window.location.href.includes("map")) {
      this.setState({
        activeItem: "map"
      });
    }
    if (window.location.href.includes("conversations")) {
      this.setState({
        activeItem: "conversations"
      });
    }
    if (window.location.href.includes("notifications")) {
      this.setState({
        activeItem: "notifications"
      });
    }
    if (window.location.href.includes("about")) {
      this.setState({
        activeItem: "about"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.activeItem &&
      this.state.activeItem !== this.props.activeItem
    ) {
      this.setState({ activeItem: this.props.activeItem });
    }
  }

  render() {
    const { activeItem } = this.state;
    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    return (
      <React.Fragment>
        <MediaQuery maxWidth={767}>
          <Menu tabular size="mini">
            <Link to={`/`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="your_profile"
                    active={activeItem === "your_profile"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="user" />
                  </Menu.Item>
                }
                header="Your Profile"
                content="See and edit your profile information"
              />
            </Link>
            <Link to={`/group_dashboard`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="your_groups"
                    active={activeItem === "your_groups"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="users" />
                  </Menu.Item>
                }
                header="Groups"
                content="See your groups, or create a new one"
              />
            </Link>
            <Link to={`/calendar`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="calendar"
                    active={activeItem === "calendar"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="calendar" />
                  </Menu.Item>
                }
                header="Calendar"
                content="See scheduled sessions, or schedule one yourself"
              />
            </Link>
            <Link to={`/map`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="map"
                    active={activeItem === "map"}
                    onClick={this.handleItemClick}
                  >
                    {" "}
                    <Icon name="map marker" />
                  </Menu.Item>
                }
                header="Map"
                content="Search for groups, sessions, and users"
              />
            </Link>
            <Link to={`/conversations`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="conversations"
                    active={activeItem === "conversations"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="chat" />
                  </Menu.Item>
                }
                header="Conversations"
                content="If you belong to a group, you can chat with other members here."
              />
            </Link>

            <Link to={`/notifications`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="notifications"
                    active={activeItem === "notifications"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="alarm" />
                  </Menu.Item>
                }
                header="Nofications"
                content="Here's where you'll be notified of incoming requests, and see a record of your outgoing requests and their current status."
              />
            </Link>
            <Link to={`/about`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="about"
                    active={activeItem === "about "}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="question" />
                  </Menu.Item>
                }
                header="About"
                content="So what is this site anyway?"
              />
            </Link>
          </Menu>
        </MediaQuery>
        <MediaQuery minWidth={767}>
          <Menu tabular size="small">
            <Link to={`/`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="your_profile"
                    active={activeItem === "your_profile"}
                    onClick={this.handleItemClick}
                  />
                }
                content="See and edit your profile information"
              />
            </Link>
            <Link to={`/group_dashboard`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="your_groups"
                    active={activeItem === "your_groups"}
                    onClick={this.handleItemClick}
                  />
                }
                content="See your groups, or create a new one"
              />
            </Link>
            <Link to={`/calendar`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="calendar"
                    active={activeItem === "calendar"}
                    onClick={this.handleItemClick}
                  />
                }
                content="See scheduled sessions, or schedule one yourself"
              />
            </Link>
            <Link to={`/map`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="map"
                    active={activeItem === "map"}
                    onClick={this.handleItemClick}
                  />
                }
                content="Search for groups, sessions, and users"
              />
            </Link>
            <Link to={`/conversations`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="conversations"
                    active={activeItem === "conversations"}
                    onClick={this.handleItemClick}
                  />
                }
                content="If you belong to a group, you can chat with other members here."
              />
            </Link>

            <Link to={`/notifications`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="notifications"
                    active={activeItem === "notifications"}
                    onClick={this.handleItemClick}
                  />
                }
                content="Here's where you'll be notified of incoming requests, and see a record of your outgoing requests and their current status."
              />
            </Link>
            <Link to={`/about`}>
              <Popup
                key="you"
                size="small"
                inverted
                basic
                trigger={
                  <Menu.Item
                    name="about"
                    active={activeItem === "about"}
                    onClick={this.handleItemClick}
                  />
                }
                content="So what is this site anyway?"
              />
            </Link>
          </Menu>
        </MediaQuery>
      </React.Fragment>
    );
  }
}
