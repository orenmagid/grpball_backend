import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import MediaQuery from "react-responsive";

class LoginForm extends React.Component {
  render() {
    return (
      // <Form
      //   unstackable
      //   inverted
      //   size="mini"
      //   key="mini"
      //   onSubmit={this.props.handleLogin}
      // >
      //   <Form.Group unstackable widths="equal">
      //     <Form.Input
      //       fluid
      //       label="Username"
      //       placeholder="Username"
      //       name="username"
      //       onChange={e => this.setState({ username: e.target.value })}
      //     />
      //     <Form.Input
      //       fluid
      //       label="Password"
      //       type="password"
      //       placeholder="Password"
      //       name="password"
      //       onChange={e => this.setState({ password: e.target.value })}
      //     />
      //     <MediaQuery minWidth={767}>
      //       <Button basic inverted type="submit">
      //         Login
      //       </Button>
      //     </MediaQuery>
      //     <MediaQuery maxWidth={767}>
      //       <Button basic size="mini" inverted type="submit">
      //         Login
      //       </Button>
      //     </MediaQuery>
      //   </Form.Group>
      // </Form>
      <React.Fragment>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui custom image header">
              <img src="../grpball-splash.png" className="image" />
              <div className="content">Log-in to your account</div>
            </h2>
            <form className="ui large form" onSubmit={this.props.handleLogin}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button className="ui huge primary button">Login</button>
              </div>

              <div className="ui error message" />
            </form>

            <div className="ui message">
              New to us?
              <Link to={`/new_user`}>
                <div onClick={this.propscreateNewUser}>Sign Up</div>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
