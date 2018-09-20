import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    let data = {
      message: {
        text: this.state.text,
        conversation_id: this.state.conversation_id,
        user_id: this.props.user.id
      }
    };
    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    });
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="ui container">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>New Message:</label>
            <br />
            <input
              type="text"
              value={this.state.text}
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

export default NewMessageForm;
