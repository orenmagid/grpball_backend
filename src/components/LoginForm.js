import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

class LoginForm extends React.Component {
  render() {
    return (
      <Form inverted size="mini" key="mini" onSubmit={this.props.handleLogin}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Username"
            placeholder="Username"
            name="username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <Form.Input
            fluid
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button basic inverted type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;
