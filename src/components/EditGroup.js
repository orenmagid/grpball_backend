import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class EditGroup extends Component {
  state = { groupname: "", address: "", latitude: "", longitude: "" };

  componentDidMount() {
    this.setState({
      groupname: this.props.group.name
    });
  }

  captureAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          address: address,
          latitude: latLng.latitude,
          longitude: latLng.longitude
        })
      )

      .catch(error => console.error("Error", error));
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <React.Fragment>
        <div className="ui header"> Edit Group Name or Location</div>

        <form
          className="ui form"
          onSubmit={e => {
            this.props.handlePatchGroupSubmit(
              e,
              this.props.group.id,
              this.state.latitude,
              this.state.longitude,
              this.state.address ? this.state.address : this.props.address
            );
            this.props.handleCloseClick();
          }}
        >
          <div className="field">
            <label>Group Name</label>
            <input
              type="text"
              name="groupname"
              placeholder="Group Name"
              value={this.state.groupname}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <LocationSearchInput
            type="edit_group"
            currentLocation={this.props.group.location}
            captureAddress={this.captureAddress}
          />

          <button type="submit" className="ui secondary basic  button">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
