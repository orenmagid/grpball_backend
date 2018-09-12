import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import "./App.css";
import MainContainer from "./containers/MainContainer";
import NavBar from "./components/NavBar";
import NewUserForm from "./components/NewUserForm";
import LoginForm from "./components/LoginForm";
import MapLandingPage from "./components/MapLandingPage";
import { Image, Reveal } from "semantic-ui-react";
import ImageSplash from "./components/ImageSplash";
import { baseUrl } from "./constants";

class App extends Component {
  state = {
    displayNewUserForm: false,
    error: "",
    sessions: [],
    groups: [],
    stage: 1
  };

  componentDidMount() {
    this.handleFetchSessions();
    this.handleFetchGroups();
  }

  handleFetchSessions = () => {
    fetch(baseUrl + "/sessions")
      .then(res => res.json())
      .then(sessions => {
        {
          console.log(sessions);
          this.setState({ sessions: sessions });
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  handleFetchGroups = () => {
    fetch(baseUrl + `/groups`)
      .then(res => res.json())
      .then(groups => {
        this.setState({
          groups: groups
        });
      });
  };

  handleChangeStage = () => {
    this.setState({
      stage: ""
    });
  };

  handleLogin = e => {
    e.preventDefault();

    console.log("inside handleLogin");

    let params = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };

    this.setState({ error: "" });

    fetch(baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);

          this.setState({ error: "" });
        } else {
          this.setState({ error: "Invalid username or password" });
          alert("Invalid username or password");
        }
      });
  };

  createNewUser = () => {
    this.setState({
      displayNewUserForm: true,
      stage: "new_user"
    });
  };

  handleCreateUser = (e, address, latitude, longitude, experience) => {
    e.preventDefault();
    console.log("experience", experience);

    let data = {
      user: {
        first_name: e.currentTarget.first_name.value,
        last_name: e.currentTarget.last_name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        location: address,
        latitude: latitude,
        longitude: longitude,
        age: e.currentTarget.age.value,
        height_in_inches: e.currentTarget.height.value,
        phone_number: e.currentTarget.phone.value,
        highest_experience: experience
      }
    };

    fetch(baseUrl + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(newUser => {
        console.log(newUser);

        if (newUser.errors) {
          this.displayErrors(newUser.errors);
        } else {
          if (newUser.success) {
            localStorage.setItem("token", newUser.token);

            this.setState({ error: "" });
            displayNewUserForm: false;
          }
          window.history.back();
        }
      });
  };

  displayErrors = errors => {
    let errorlist = errors.map(error => {
      return `-${error} \n`;
    });
    alert(errorlist.join(" "));
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      user: null
    });
  };

  render() {
    if (
      localStorage.getItem("token") &&
      (window.location.href.includes("map_splash") ||
        window.location.href.includes("login"))
    ) {
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <header className="ui header segment">
          <div className="ui container">
            <NavBar
              displayNewUserForm={this.state.displayNewUserForm}
              createNewUser={this.createNewUser}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
          </div>
        </header>
        <div className="top-margin">
          {!localStorage.getItem("token") && this.state.stage !== "map" ? (
            <Route
              exact
              path="/"
              render={routerProps => (
                <ImageSplash
                  createNewUser={this.createNewUser}
                  handleChangeStage={this.handleChangeStage}
                />
              )}
            />
          ) : null}
        </div>
        <div className="ui container top-margin">
          <Route
            exact
            path="/new_user"
            render={routerProps => (
              <NewUserForm
                handleCreateOrEditUser={this.handleCreateUser}
                displayNewUserForm={this.state.displayNewUserForm}
              />
            )}
          />
          {localStorage.getItem("token") ? (
            <Route
              path="/"
              render={routerProps => (
                <MainContainer
                  handleFetchSessions={this.handleFetchSessions}
                  handleFetchGroups={this.handleFetchGroups}
                  sessions={this.state.sessions}
                  groups={this.state.groups}
                />
              )}
            />
          ) : null}
          {localStorage.getItem("token") ? null : (
            <Route
              path="/map_splash"
              render={routerProps => (
                <MapLandingPage
                  sessions={this.state.sessions}
                  groups={this.state.groups}
                  createNewUser={this.createNewUser}
                />
              )}
            />
          )}
          {localStorage.getItem("token") ? null : (
            <Route
              path="/login"
              render={routerProps => (
                <LoginForm
                  createNewUser={this.createNewUser}
                  handleLogin={this.handleLogin}
                />
              )}
            />
          )}
        </div>
        {/* 
        <footer className="ui footer segment" /> */}
      </div>
    );
  }
}

export default App;
