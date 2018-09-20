import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class CreateGroup extends Component {
  state = { address: "", latitude: "", longitude: "" };

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

  render() {
    return (
      <React.Fragment>
        <div className="ui header"> Create New Group</div>

        <form
          className="ui form"
          onSubmit={e =>
            this.props.handleNewGroupSubmit(
              e,
              this.state.latitude,
              this.state.longitude,
              this.state.address
            )
          }
        >
          <div className="field">
            <label>Group Name</label>
            <input type="text" name="groupname" placeholder="Group Name" />
          </div>
          <LocationSearchInput
            type="group"
            captureAddress={this.captureAddress}
          />

          <button type="submit" className="ui secondary basic  button">
            Create Group
          </button>
        </form>
      </React.Fragment>
    );
  }
}
