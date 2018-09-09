import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import MediaQuery from "react-responsive";

const NavBar = ({
  createNewUser,
  displayNewUserForm,
  handleLogin,
  handleLogout
}) => (
  <Grid container>
    <Grid.Row>
      <Grid.Column width={4}>
        <Link to={`/`}>
          <h1 className="ui inverted header">GRPBALL</h1>
        </Link>
      </Grid.Column>
      {!localStorage.token && !window.location.href.includes("login") ? (
        <Grid.Column width={12}>
          {/* <LoginForm handleLogin={handleLogin} /> */}
          <Link to={`/login`}>
            <button className="ui inverted basic right floated button">
              Login
            </button>
          </Link>
        </Grid.Column>
      ) : null}

      {localStorage.token ? (
        <Grid.Column width={12}>
          <Link to={`/`}>
            <button
              onClick={handleLogout}
              className="ui inverted basic right floated button"
            >
              Logout
            </button>
          </Link>
        </Grid.Column>
      ) : null}
    </Grid.Row>
  </Grid>
);

export default NavBar;
