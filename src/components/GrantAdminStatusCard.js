import React, { Component } from "react";
import { Card, Form, Button } from "semantic-ui-react";

export default class AddUserFormCard extends Component {
  state = {
    group_id: ""
  };

  handleChange = (e, { value }) => this.setState({ group_id: value });

  render() {
    const {
      group,
      handleCloseClick,
      handleGrantAdminSubmit,
      user
    } = this.props;

    const users = group.users.filter(gUser => gUser.id !== user.id);

    const options = users.map(user => {
      return {
        key: `${user.id}`,
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.id}`
      };
    });

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
