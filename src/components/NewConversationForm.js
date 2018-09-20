import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class NewConversationForm extends React.Component {
  state = {
    title: ""
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    let data = {
      conversation: this.state
    };

    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    });
    this.setState({ title: "" });
  };

  render = () => {
    return (
      <div className="ui container">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>New Conversation:</label>
            <br />
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <button className="ui secondary basic  button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
