import React from "react";
import { Route } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import UserDashboard from "./UserDashboard";
import GroupDashboard from "./GroupDashboard";
import NotificationsDashboard from "./NotificationsDashboard";
import CalendarDashboard from "./CalendarDashboard";
import MapDashboard from "./MapDashboard";

import UserFeed from "../components/UserFeed";
import { Segment, Loader } from "semantic-ui-react";
// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants";

const baseUrl = "http://localhost:3000/api/v1";

class UserContainer extends React.Component {
  state = {
    user: null,
    userFeed: [],
    userNotifications: [],
    sessions: []
  };

  handleFetchSessions = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "/sessions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(sessions => {
          this.setState({ sessions: sessions });
        })
        .catch(e => {
          alert(e);
        });
    }
  };

  handleforceUserUpdate = () => {
    console.log("inside handleforceUpdate");
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user information
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
      // Fetch user feed
      fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(userFeed => {
          console.log("userFeed", userFeed);
          this.setState({ userFeed: userFeed });
        })
        .catch(e => console.error(e));

      // Fetch user notifications
      fetch("http://localhost:3000/notification_user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(userNotifications => {
          console.log("userNotifications", userNotifications);
          this.setState({ userNotifications: userNotifications });
        })
        .catch(e => console.error(e));
    }
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user information
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
      // Fetch user feed
      fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(userFeed => {
          console.log("userFeed", userFeed);
          this.setState({ userFeed: userFeed });
        })
        .catch(e => console.error(e));

      // Fetch user notifications
      fetch("http://localhost:3000/notification_user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(userNotifications => {
          console.log("userNotifications", userNotifications);
          this.setState({ userNotifications: userNotifications });
        })
        .catch(e => console.error(e));

      this.handleFetchSessions();

      // Fetch user feed from actioncable
      // fetch(`${API_ROOT}/me`)
      //   .then(res => res.json())
      //   .then(userFeed => this.setState({ userFeed }));
    }
  }

  // handleReceivedUserFeed = response => {
  //   // const { userFeed } = response;
  //   this.setState({
  //     userFeed: [...this.state.userFeed, response]
  //   });
  // };

  render() {
    return (
      <div className="ui container">
        {/* <ActionCable
          channel={{ channel: "UserChannel" }}
          onReceived={this.handleReceivedUserFeed}
        /> */}
        <Route
          path="/"
          render={routerProps => <UserMenu user={this.state.user} />}
        />

        {this.state.user ? (
          <Route
            exact
            path="/"
            render={routerProps => (
              <Segment>
                <UserDashboard user={this.state.user} />
                <UserFeed userFeed={this.state.userFeed} />
              </Segment>
            )}
          />
        ) : (
          <Loader active size="huge" inline="centered" />
        )}
        {this.state.user ? (
          <Route
            exact
            path="/group_dashboard"
            render={routerProps => (
              <GroupDashboard
                user={this.state.user}
                handleForceUserUpdate={this.handleforceUserUpdate}
                handleFetchSessions={this.handleFetchSessions}
                sessions={this.state.sessions}
              />
            )}
          />
        ) : null}
        {this.state.user ? (
          <Route
            exact
            path="/calendar"
            render={routerProps => (
              <CalendarDashboard
                user={this.state.user}
                sessions={this.state.sessions}
                handleFetchSessions={this.handleFetchSessions}
              />
            )}
          />
        ) : null}

        {this.state.user ? (
          <Route
            exact
            path="/map"
            render={routerProps => (
              <MapDashboard
                user={this.state.user}
                sessions={this.state.sessions}
                handleFetchSessions={this.handleFetchSessions}
              />
            )}
          />
        ) : null}

        {this.state.user ? (
          <Route
            exact
            path="/notifications"
            render={routerProps => (
              <NotificationsDashboard
                userNotifications={this.state.userNotifications}
                user={this.state.user}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default UserContainer;
