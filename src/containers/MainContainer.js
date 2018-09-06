import React from "react";
import { Route } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import UserDashboard from "./UserDashboard";
import GroupDashboard from "./GroupDashboard";
import EditUserProfile from "../components/EditUserProfile";
import NewUserForm from "../components/NewUserForm";
import NotificationsDashboard from "./NotificationsDashboard";
import CalendarDashboard from "./CalendarDashboard";
import MapDashboard from "./MapDashboard";

import UserFeed from "../components/UserFeed";
import { Segment, Loader } from "semantic-ui-react";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball-backend.herokuapp.com/api/v1";
const baseUrlForFeed = "https://grpball-backend.herokuapp.com";

class MainContainer extends React.Component {
  state = {
    user: null,
    userFeed: [],
    userNotifications: [],
    sessions: [],
    groups: [],
    users: [],
    formToShow: "",
    activeItem: "",
    chatrooms: []
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
      fetch(baseUrlForFeed + "/me", {
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
      fetch(baseUrlForFeed + "/notification_user", {
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
      fetch(baseUrlForFeed + "/me", {
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
      fetch(baseUrlForFeed + "/notification_user", {
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

      // fetch all users
      fetch(baseUrl + `/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(users => {
          this.setState({
            users: users
          });
        });

      this.props.handleFetchSessions();
    }
  }

  handleReceivedUserFeed = response => {
    // const { userFeed } = response;
    this.setState({
      userFeed: [...this.state.chatrooms, response]
    });
  };

  handleEditProfile = e => {
    e.preventDefault();
    this.state.formToShow === "editProfile"
      ? this.setState({ formToShow: "" })
      : this.setState({ formToShow: "editProfile" });
  };

  handlePatchUser = (e, user) => {
    e.preventDefault();
    let data = {
      user: {
        first_name: e.currentTarget.first_name.value,
        last_name: e.currentTarget.last_name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        // password: e.currentTarget.password.value,
        location: e.currentTarget.location.value,
        age: e.currentTarget.age.value,
        height_in_inches: e.currentTarget.height.value,
        phone_number: e.currentTarget.phone.value
        // experience: e.currentTarget.experience.value
      }
    };
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(updatedUser => {
          console.log(updatedUser);

          if (updatedUser.errors) {
            this.displayErrors(updatedUser.errors);
          } else {
            this.setState({
              user: updatedUser,
              formToShow: ""
            });
          }
        });
    }
  };

  handleFormCloseClick = () => {
    this.setState({
      formToShow: ""
    });
  };

  displayErrors = errors => {
    let errorlist = errors.map(error => {
      return `-${error} \n`;
    });
    alert(errorlist.join(" "));
  };

  render() {
    return (
      <div className="ui container">
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
                <UserDashboard
                  user={this.state.user}
                  handleEditProfile={this.handleEditProfile}
                />
                {this.state.user && this.state.formToShow === "editProfile" ? (
                  <EditUserProfile
                    handleCreateOrEditUser={this.handlePatchUser}
                    user={this.state.user}
                    handleCloseClick={this.handleFormCloseClick}
                  />
                ) : null}
                {this.state.userFeed.length > 0 ? (
                  <UserFeed userFeed={this.state.userFeed} />
                ) : null}
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
                handleFetchSessions={this.props.handleFetchSessions}
                sessions={this.props.sessions}
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
                sessions={this.props.sessions}
                handleFetchSessions={this.props.handleFetchSessions}
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
                sessions={this.props.sessions}
                handleFetchSessions={this.props.handleFetchSessions}
                groups={this.props.groups}
                users={this.state.users}
              />
            )}
          />
        ) : null}

        {this.state.user && this.state.userNotifications.length > 0 ? (
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

export default MainContainer;
