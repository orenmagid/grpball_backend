import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import MediaQuery from "react-responsive";

export default class UserMenu extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
        <MediaQuery maxWidth={992}>
          <Menu tabular size="small">
            <Link to={`/`}>
              <Menu.Item
                name="you"
                active={activeItem === "you"}
                onClick={this.handleItemClick}
              >
                <Icon name="user" />
              </Menu.Item>
            </Link>
            <Link to={`/group_dashboard`}>
              <Menu.Item
                name="your_groups"
                active={activeItem === "your_groups"}
                onClick={this.handleItemClick}
              >
                <Icon name="users" />
              </Menu.Item>
            </Link>
            <Link to={`/calendar`}>
              <Menu.Item
                name="calendar"
                active={activeItem === "calendar"}
                onClick={this.handleItemClick}
              >
                <Icon name="calendar" />
              </Menu.Item>
            </Link>
            <Link to={`/map`}>
              <Menu.Item
                name="map"
                active={activeItem === "map"}
                onClick={this.handleItemClick}
              >
                {" "}
                <Icon name="map marker" />
              </Menu.Item>
            </Link>

            <Link to={`/notifications`}>
              <Menu.Item
                name="notifications"
                active={activeItem === "notifications"}
                onClick={this.handleItemClick}
              >
                <Icon name="alarm" />
              </Menu.Item>
            </Link>
          </Menu>
        </MediaQuery>
        <MediaQuery minWidth={992}>
          <Menu tabular size="small">
            <Link to={`/`}>
              <Menu.Item
                name="you"
                active={activeItem === "you"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to={`/group_dashboard`}>
              <Menu.Item
                name="your_groups"
                active={activeItem === "your_groups"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to={`/calendar`}>
              <Menu.Item
                name="calendar"
                active={activeItem === "calendar"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to={`/map`}>
              <Menu.Item
                name="map"
                active={activeItem === "map"}
                onClick={this.handleItemClick}
              />
            </Link>

            <Link to={`/notifications`}>
              <Menu.Item
                name="notifications"
                active={activeItem === "notifications"}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu>
        </MediaQuery>
      </React.Fragment>
    );
  }
}
