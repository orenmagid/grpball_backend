import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";

const NavBar = ({
  createNewUser,
  displayNewUserForm,
  handleLogin,
  handleLogout
}) => (
  <Grid container columns={2}>
    <Grid.Row>
      <Grid.Column width={4}>
        <div className="margin-auto">
          {!localStorage.token && !displayNewUserForm ? (
            <Link to={`/newuser`}>
              <button
                onClick={createNewUser}
                className="ui inverted basic button"
              >
                Create Account
              </button>
            </Link>
          ) : null}
        </div>
      </Grid.Column>

      {localStorage.token ? null : (
        <Grid.Column width={12}>
          <LoginForm handleLogin={handleLogin} />
        </Grid.Column>
      )}

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
      ) : (
        <Grid.Column width={12} />
      )}
    </Grid.Row>
  </Grid>
);

export default NavBar;
