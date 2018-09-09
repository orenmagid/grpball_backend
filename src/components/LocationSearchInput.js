import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", formatted_address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));

    geocodeByAddress(address).then(results => {
      this.setState({ formatted_address: results[0].formatted_address });
      this.props.captureAddress(results[0].formatted_address);
    });
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
                {this.props.type === "group" ? (
                  <h5 className="ui inverted header">
                    Where is your group located?
                  </h5>
                ) : null}
                {this.props.type === "session" ? (
                  <h5 className="ui inverted header">
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
                        : "We've found that location"}
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
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className="two wide column" />
      </div>
    );
  }
}
