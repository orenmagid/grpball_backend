import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Segment, Card } from "semantic-ui-react";

export class MapDashboard extends Component {
  state = {
    selectedPlace: {}
  };
  render() {
    return (
      <div className="ui raised container map segment">
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick} name={"Current location"} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNfb_UadB3LFS4dbL9hbQRA-6wOV4jJTE"
})(MapDashboard);
