import React from "react";
import { Button, Form } from "semantic-ui-react";
import MediaQuery from "react-responsive";

class LoginForm extends React.Component {
  render() {
    return (
      <Form
        unstackable
        inverted
        size="mini"
        key="mini"
        onSubmit={this.props.handleLogin}
      >
        <Form.Group unstackable widths="equal">
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
          <MediaQuery minWidth={767}>
            <Button basic inverted type="submit">
              Login
            </Button>
          </MediaQuery>
          <MediaQuery maxWidth={767}>
            <Button basic size="mini" inverted type="submit">
              Login
            </Button>
          </MediaQuery>
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;
