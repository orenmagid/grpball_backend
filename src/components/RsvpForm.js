import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

export default class RsvpForm extends Component {
  state = {
    status: ""
  };
  render() {
    const options = [
      { key: 1, text: "I'll be there", value: "Accepted" },
      { key: 2, text: "I won't be there", value: "Declined" },
      { key: 3, text: "I'm not sure", value: "Delayed" }
    ];
    return (
      <React.Fragment>
        <div className="ui header"> RSVP for this Session</div>

        <form
          className="ui form"
          onSubmit={e => this.props.handleNewRsvp(e, this.props.session.id)}
        >
          <div class="field">
            <select name="status">
              <option value="Accepted">I'll be there</option>
              <option value="Declined">I won't be there</option>
              <option value="Delayed">I'm not sure</option>
            </select>
          </div>

          <div class="field">
            <label>Text</label>
            <textarea name="otherText" />
          </div>

          <button type="submit" className="ui secondary basic button">
            RSVP
          </button>
        </form>
      </React.Fragment>
    );
  }
}
