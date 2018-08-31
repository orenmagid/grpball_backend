import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

export default class RsvpForm extends Component {
  state = {
    other_Text: this.props.rsvp ? this.props.rsvp.other_text : ""
  };
  render() {
    const options = [
      { key: 1, text: "I'll be there", value: "Accepted" },
      { key: 2, text: "I won't be there", value: "Declined" },
      { key: 3, text: "I'm not sure", value: "Delayed" }
    ];

    let status;
    if (this.props.rsvp) {
      status = this.props.rsvp.status;
    }

    return (
      <React.Fragment>
        <i
          className="window close icon"
          onClick={this.props.handleCloseClick}
        />
        <div className="ui header">RSVP for this Session</div>

        <form
          className="ui form"
          onSubmit={e => this.props.handleNewRsvp(e, this.props.session.id)}
        >
          <div class="field">
            <select name="status">
              <option
                selected={status === "Accepted" ? "selected" : null}
                value="Accepted"
              >
                I'll be there
              </option>
              <option
                selected={status === "Declined" ? "selected" : null}
                value="Declined"
              >
                I won't be there
              </option>
              <option
                selected={status === "Delayed" ? "selected" : null}
                value="Delayed"
              >
                I'm not sure
              </option>
            </select>
          </div>

          <div class="field">
            <label>Text</label>
            <textarea name="otherText" value={this.state.other_text} />
          </div>

          <button type="submit" className="ui secondary basic button">
            RSVP
          </button>
        </form>
      </React.Fragment>
    );
  }
}
