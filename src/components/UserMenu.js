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
        <Link to={`/user_dashboard`}>
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

        <Link to={`/sessions_and_games`}>
          <Menu.Item
            name="sessions_and_games"
            active={activeItem === "sessions_and_games"}
            onClick={this.handleItemClick}
          />
        </Link>
      </Menu>
    );
  }
}
