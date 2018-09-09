import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      formatted_address: "",
      errorMessage: "",
      suggestion: ""
    };
  }

  handleChange = address => {
    this.setState({ address: address, errorMessage: "" });
  };

  handleSelect = (address, placeId) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));

    geocodeByAddress(address).then(results => {
      console.log(results);
      this.setState({
        formatted_address: results[0].formatted_address,
        address: ""
      });
      this.props.captureAddress(results[0].formatted_address);
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status);
    this.setState({ errorMessage: status });
  };

  render() {
    return (
      <div className="ui container grid">
        <div className="two wide column" />
        <div className="twelve wide column">
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            onError={this.handleError}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                {this.props.type === "user" ? (
                  <h5 className="ui inverted header">Your homecourt or city</h5>
                ) : null}
                {this.props.type === "user_edit" ? (
                  <React.Fragment>
                    <h5 className="ui inverted header">
                      Update your homecourt or city{" "}
                    </h5>{" "}
                    <h6 className="ui inverted header">
                      Currently, it's {this.props.currentLocation}
                    </h6>
                  </React.Fragment>
                ) : null}
                {this.props.type === "group" ? (
                  <h5 className="ui header">Where is your group located?</h5>
                ) : null}
                {this.props.type === "session" ? (
                  <h5 className="ui  header">
                    Where will the session be located?
                  </h5>
                ) : null}
                <input
                  {...getInputProps({
                    placeholder:
                      this.props.type === "session"
                        ? "Search for the court..."
                        : "Search Places ...",
                    className: "location-search-input"
                  })}
                />{" "}
                {this.state.formatted_address ? (
                  <div className="ui message">
                    <div className="header">
                      {this.props.type === "session"
                        ? "We've found that court"
                        : null}
                      {this.props.type === "user"
                        ? "We've found that location"
                        : null}
                      {this.props.type === "user_edit"
                        ? "We've found that location. We'll update it when you submit this form."
                        : null}
                      {this.props.type === "group"
                        ? "We've found that location."
                        : null}
                    </div>
                    <p>{this.state.formatted_address}</p>
                  </div>
                ) : null}
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    // const style = suggestion.active
                    //   ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    //   : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className
                          // style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                  {/* <div className="dropdown-footer">
                    <div>
                      <img
                        src={"../powered_by_google_default.png"}
                        className="dropdown-footer-image"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {this.state.errorMessage.length > 0 && (
            <div className="Demo__error-message">
              Error: {this.state.errorMessage}. Please try again.
            </div>
          )}
        </div>
        <div className="two wide column" />
      </div>
    );
  }
}
