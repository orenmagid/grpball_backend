import React from "react";
import { Route } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import UserDashboard from "./UserDashboard";
import GroupDashboard from "./GroupDashboard";
import SessionsDashboard from "./SessionsDashboard";

const baseUrl = "http://localhost:3000/api/v1";

class UserContainer extends React.Component {
  state = {
    user: null
  };

  handleforceUserUpdate = () => {
    console.log("inside handleforceUpdate");
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ user: data });
        })
        .catch(e => console.error(e));
    }
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ user: data });
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    return (
      <div>
        <Route
          path="/"
          render={routerProps => <UserMenu user={this.state.user} />}
        />

        {this.state.user ? (
          <Route
            exact
            path="/user_dashboard"
            render={routerProps => <UserDashboard user={this.state.user} />}
          />
        ) : (
          <p>Loading...</p>
        )}
        {this.state.user ? (
          <Route
            exact
            path="/group_dashboard"
            render={routerProps => (
              <GroupDashboard
                user={this.state.user}
                handleForceUpdate={this.handleforceUpdate}
              />
            )}
          />
        ) : (
          <p>Loading...</p>
        )}

        {this.state.user ? (
          <Route
            exact
            path="/sessions_and_games"
            render={routerProps => <SessionsDashboard user={this.state.user} />}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default UserContainer;
