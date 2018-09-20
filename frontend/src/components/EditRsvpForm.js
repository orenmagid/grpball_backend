import React, { Component } from "react";

export default class RsvpForm extends Component {
  state = {
    otherText: this.props.rsvp.other_text
  };

  handleChange = e => {
    this.setState({ otherText: e.target.value });
  };
  render() {
    let status;
    if (this.props.rsvp) {
      status = this.props.rsvp.status;
    }

    return (
      <React.Fragment>
        <i
          className="window close outline icon"
          onClick={this.props.handleCloseClick}
        />
        <div className="ui header">
          {this.props.formToShow === "newRsvp"
            ? "RSVP for this Session"
            : "Edit Your RSVP for this Session"}
        </div>

        <form
          className="ui form"
          onSubmit={e =>
            this.props.handleRsvp(
              e,
              this.props.session.id,
              this.state.otherText
            )
          }
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
            <label>Additional Information</label>
            <textarea
              name="otherText"
              value={this.state.otherText}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="ui secondary basic button">
            RSVP
          </button>
        </form>
      </React.Fragment>
    );
  }
}
