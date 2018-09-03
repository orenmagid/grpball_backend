import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class UserMenu extends Component {
  state = { activeItem: "user_information" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular>
        <Link to={`/`}>
          <Menu.Item
            name="user_information"
            active={activeItem === "user_information"}
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
    );
  }
}
