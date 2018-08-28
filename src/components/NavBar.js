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
  <Grid container columns={2} divided>
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
          ) : (
            <Link to={`/`}>
              <button
                onClick={handleLogout}
                className="ui inverted basic button"
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </Grid.Column>
      <Grid.Column width={12}>
        {localStorage.token ? null : <LoginForm handleLogin={handleLogin} />}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NavBar;
