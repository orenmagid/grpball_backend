import React, { Component } from "react";
import { Card, Form, Button } from "semantic-ui-react";

export default class GrantAdminStatusCard extends Component {
  state = {
    group_id: ""
  };

  handleChange = (e, { value }) => this.setState({ group_id: value });

  render() {
    const {
      group,
      handleCloseClick,
      handleGrantAdminSubmit,
      user,
      users,
      nonUserAdmins
    } = this.props;

    const nonAdminUsers = group.users.filter(user => {
      for (var i = 0; i < nonUserAdmins.length; i++) {
        if (nonUserAdmins[i].id === user.id) {
          return false;
        }
      }
      return true;
    });
    console.log("nonAdminUsers", nonAdminUsers);
    let newNonAdminUsers = nonAdminUsers.filter(nonAdminUser => {
      return nonAdminUser.id !== user.id;
    });

    const options = newNonAdminUsers.map(user => {
      return {
        key: `${user.id}`,
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.id}`
      };
    });

    console.log("users", users);
    console.log("nonAdminUsers", nonAdminUsers);
    console.log("newNonAdminUsers", newNonAdminUsers);

    return (
      <Card centered>
        <i className="window close icon" onClick={handleCloseClick} />
        <Card.Content>
          <Form onSubmit={() => handleGrantAdminSubmit(this.state.group_id)}>
            <Form.Select
              name="users"
              fluid
              label="Grant Admin Priviledges"
              options={options}
              placeholder="Users"
              onChange={this.handleChange}
            />
            <Button secondary basic type="submit">
              Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
