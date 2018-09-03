import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import MainContainer from "./containers/MainContainer";
import NavBar from "./components/NavBar";
import NewUserForm from "./components/NewUserForm";

const baseUrl = "http://localhost:3000/api/v1";

class App extends Component {
  state = {
    displayNewUserForm: false,
    error: ""
  };

  handleLogin = e => {
    e.preventDefault();

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
      displayNewUserForm: true
    });
  };

  handleCreateUser = e => {
    e.preventDefault();
    let data = {
      user: {
        first_name: e.currentTarget.first_name.value,
        last_name: e.currentTarget.last_name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        location: e.currentTarget.location.value,
        age: e.currentTarget.age.value,
        height_in_inches: e.currentTarget.height.value,
        phone_number: e.currentTarget.phone.value
        // experience: e.currentTarget.experience.value
      }
    };

    const baseUrl = "http://localhost:3000/api/v1";

    fetch(baseUrl + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
        console.log(data);
        if (jsonData.errors) {
          this.displayErrors(jsonData.errors);
        } else {
          this.setState({
            displayNewUserForm: false
          });
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
    return (
      <div className="App">
        <header className="App-header">
          <div className="ui container top-margin">
            <NavBar
              displayNewUserForm={this.state.displayNewUserForm}
              createNewUser={this.createNewUser}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
          </div>
        </header>
        <div className="ui container top-margin">
          <Route
            exact
            path="/newuser"
            render={routerProps => (
              <NewUserForm
                handleCreateUser={this.handleCreateUser}
                displayNewUserForm={this.state.displayNewUserForm}
              />
            )}
          />
          {localStorage.getItem("token") ? (
            <Route path="/" render={routerProps => <MainContainer />} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
