import React, { Component } from "react";
import "./App.css";
import UserPage from "./UserPage";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm />
        </header>
        <div className="ui container">
          <UserPage />
        </div>
      </div>
    );
  }
}

export default App;
