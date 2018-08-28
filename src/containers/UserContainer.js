import React from "react";
import { Route } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import UserDashboard from "../components/UserDashboard";
import GroupDashboard from "../components/GroupDashboard";

const baseUrl = "http://localhost:3000/api/v1";

class UserContainer extends React.Component {
  state = {
    user: null
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
        <Route path="/" render={routerProps => <UserMenu />} />

        {this.state.user ? (
          <Route
            exact
            path="/userdashboard"
            render={routerProps => <UserDashboard user={this.state.user} />}
          />
        ) : (
          <p>Loading...</p>
        )}
        {this.state.user ? (
          <Route
            exact
            path="/groupdashboard"
            render={routerProps => <GroupDashboard user={this.state.user} />}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default UserContainer;
