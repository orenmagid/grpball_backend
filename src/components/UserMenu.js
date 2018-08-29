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
        <Link to={`/userdashboard`}>
          <Menu.Item
            name="user_information"
            active={activeItem === "user_information"}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to={`/groupdashboard`}>
          <Menu.Item
            name="your_groups"
            active={activeItem === "your_groups"}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to={`/schedulingdashboard`}>
          <Menu.Item
            name="scheduling"
            active={activeItem === "scheduling"}
            onClick={this.handleItemClick}
          />
        </Link>
      </Menu>
    );
  }
}
