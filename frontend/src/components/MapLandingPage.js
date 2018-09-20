import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import LocationSearchInputForMap from "./LocationSearchInputForMap";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Checkbox, Grid, Label, Header, Segment } from "semantic-ui-react";
import MapLandingSessionInfo from "../components/MapLandingSessionInfo";
import InteractiveSegment from "../components/InteractiveSegment";
import GroupCardMinimalDisplay from "../components/GroupCardMinimalDisplay";
import UserInfo from "../components/UserInfo";
import MediaQuery from "react-responsive";
import moment from "moment";

import { baseUrl } from "../constants";

export class MapLandingPage extends Component {
  state = {
    selectedEvent: null,
    selectedGroup: null,
    whatToDisplayOnMap: "allSessions",
    userPosition: null,
    searchPosition: null,
    zoomType: null,
    address: ""
  };

  captureAddress = latLng => {
    this.setState({
      searchPosition: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    });
  };

  captureZoomType = resultsTypes => {
    this.setState({
      zoomType: resultsTypes
    });
  };

  componentDidMount() {
    window.onload = () => {
      var startPos;
      var geoSuccess = position => {
        startPos = position;
        this.setState({
          userPosition: {
            lat: startPos.coords.latitude,
            lng: startPos.coords.longitude
          }
        });
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
  }

  handleShowGroupFromSession = (e, group) => {
    e.preventDefault();
    if (this.state.selectedGroup && this.state.selectedGroup.id === group.id) {
      this.setState({
        selectedEvent: null,
        selectedGroup: null,
        currentRsvp: ""
      });
    } else {
      this.setState({
        selectedGroup: group,
        groupUsers: group.users,
        selectedEvent: null
      });
    }
  };

  onMarkerClick = (props, marker, e) => {
    if (props.session) {
      if (
        this.state.selectedEvent &&
        this.state.selectedEvent.id === props.session.id
      ) {
        this.setState({ selectedEvent: null });
      } else {
        this.setState({
          selectedGroup: null,
          selectedEvent: props.session
        });
      }
    } else if (props.group) {
      if (
        this.state.selectedGroup &&
        this.state.selectedGroup.id === props.group.id
      ) {
        this.setState({
          selectedEvent: null,
          selectedGroup: null
        });
      } else {
        this.setState({
          selectedGroup: props.group,
          selectedEvent: null
        });
      }
    } else if (props.user) {
      if (
        this.state.displayedUser &&
        this.state.displayedUser.id === props.user.id
      ) {
        this.setState({
          displayedUser: null,
          selectedEvent: null
        });
      } else {
        this.setState({
          displayedUser: props.user,
          selectedEvent: null
        });
      }
    }
  };

  // onMouseoverMarker = (props, marker, e) => {
  //   if (props.group) {
  //     this.setState({ activeMarker: marker });
  //   } else if (props.session) {
  //     this.setState({ activeMarker: marker });
  //   }
  // };

  handleSelectEvent = event => {
    if (this.state.selectedEvent && this.state.selectedEvent.id === event.id) {
      this.setState({ selectedEvent: null });
    } else {
      this.setState({
        selectedEvent: event
      });
    }
  };

  handleCloseClick = () => {
    this.setState({
      selectedEvent: null,
      selectedGroup: null
    });
  };

  handleShowSession = currentSession => {
    this.setState({
      selectedEvent: currentSession
    });
  };

  handleToggle = whatToDisplay =>
    this.setState({
      whatToDisplayOnMap:
        this.state.whatToDisplayOnMap === whatToDisplay ? "" : whatToDisplay,
      selectedEvent: null,
      selectedGroup: null
    });

  render() {
    const { user, sessions, groups, users, createNewUser } = this.props;

    let initialCenter = {
      lat: 38.89511,
      lng: -77.03637
    };

    let markers;
    let nonCancelledFutureSessions = sessions.filter(session => {
      return session.status !== "Cancelled" && moment(session.date) > moment();
    });

    switch (this.state.whatToDisplayOnMap) {
      case "allSessions":
        markers = nonCancelledFutureSessions.map(session => {
          return (
            <Marker
              key={session.id}
              session={session}
              title={session.group.name}
              name={session.location}
              position={{ lat: session.latitude, lng: session.longitude }}
              onClick={this.onMarkerClick}
              onMouseover={this.onMouseoverMarker}
            />
          );
        });
        break;

      case "allGroups":
        markers = this.props.groups.map(group => {
          return (
            <Marker
              key={group.id}
              group={group}
              title={group.name}
              name={group.location}
              position={{ lat: group.latitude, lng: group.longitude }}
              onClick={this.onMarkerClick}
              onMouseover={this.onMouseoverMarker}
            />
          );
        });
        break;
    }

    let zoom;
    if (this.state.zoomType) {
      if (this.state.zoomType.includes("country")) {
        zoom = 5;
      } else if (
        this.state.zoomType.includes("establishment") ||
        this.state.zoomType.includes("point_of_interest") ||
        this.state.zoomType.includes("gym") ||
        this.state.zoomType.includes("route")
      ) {
        zoom = 18;
      } else if (this.state.zoomType.includes("administrative_area_level_1")) {
        zoom = 8;
      }
    } else {
      zoom = 11;
    }

    return (
      <React.Fragment>
        <Link to={`/new_user`}>
          <div className="ui huge primary button" onClick={createNewUser}>
            Create an Account <i className="right arrow icon" />
          </div>
        </Link>
        <Segment>
          Take a look at the map to find groups and pickup sessions near you.
          Once you create an account, you can find other users near you too.
        </Segment>
        <MediaQuery minWidth={992}>
          <div className="ui two column grid container segment">
            <div className="column">
              <Checkbox
                slider
                label="Browse Sessions"
                onChange={() => this.handleToggle("allSessions")}
                checked={this.state.whatToDisplayOnMap === "allSessions"}
              />
            </div>

            <div className="column">
              <Checkbox
                slider
                label="Browse Groups"
                onChange={() => this.handleToggle("allGroups")}
                checked={this.state.whatToDisplayOnMap === "allGroups"}
              />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={992}>
          <Grid>
            <Grid.Column stretched centered width={16}>
              {this.state.selectedGroup ? (
                <GroupCardMinimalDisplay
                  handleCloseClick={this.handleCloseClick}
                  sessions={sessions}
                  group={this.state.selectedGroup}
                  user={user}
                />
              ) : null}

              {this.state.selectedEvent ? (
                <MapLandingSessionInfo
                  group={this.state.selectedEvent.group}
                  handleCloseClick={this.handleCloseClick}
                  session={this.state.selectedEvent}
                  handleShowGroupFromSession={this.handleShowGroupFromSession}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column stretched centered width={2}>
              <Grid.Row verticalAlign="middle" />
              <Grid.Row verticalAlign="middle">
                <Checkbox
                  onChange={() => this.handleToggle("allSessions")}
                  checked={this.state.whatToDisplayOnMap === "allSessions"}
                />
                <br />
                <Header as="h5">All Sessions</Header>
              </Grid.Row>

              <Grid.Row verticalAlign="middle">
                <Checkbox
                  onChange={() => this.handleToggle("allGroups")}
                  checked={this.state.whatToDisplayOnMap === "allGroups"}
                />{" "}
                <br />
                <Header as="h5">All Groups</Header>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={14}>
              <div className="ui raised container map segment">
                <LocationSearchInputForMap
                  captureAddress={this.captureAddress}
                  captureZoomType={this.captureZoomType}
                />
                <Map
                  google={this.props.google}
                  zoom={zoom}
                  initialCenter={
                    this.state.userPosition
                      ? this.state.userPosition
                      : initialCenter
                  }
                  center={
                    this.state.searchPosition
                      ? this.state.searchPosition
                      : initialCenter
                  }
                >
                  {markers}
                  {this.state.selectedEvent ? (
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible="true"
                      onClose={this.onInfoWindowClose}
                    >
                      <div>
                        <h1>{this.state.selectedEvent.group.name}</h1>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Map>
              </div>
            </Grid.Column>
          </Grid>
        </MediaQuery>

        <MediaQuery minWidth={992}>
          {this.state.selectedGroup ? (
            <GroupCardMinimalDisplay
              handleCloseClick={this.handleCloseClick}
              sessions={sessions}
              group={this.state.selectedGroup}
              user={user}
            />
          ) : null}

          {this.state.selectedEvent ? (
            <MapLandingSessionInfo
              group={this.state.selectedEvent.group}
              handleCloseClick={this.handleCloseClick}
              session={this.state.selectedEvent}
              handleShowGroupFromSession={this.handleShowGroupFromSession}
            />
          ) : null}

          <div className="ui raised container map segment">
            <LocationSearchInputForMap
              captureZoomType={this.captureZoomType}
              captureAddress={this.captureAddress}
            />
            <Map
              google={this.props.google}
              zoom={zoom}
              initialCenter={
                this.state.userPosition
                  ? this.state.userPosition
                  : initialCenter
              }
              center={
                this.state.searchPosition
                  ? this.state.searchPosition
                  : initialCenter
              }
            >
              {markers}
              {this.state.selectedEvent ? (
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible="true"
                  onClose={this.onInfoWindowClose}
                >
                  <div>
                    <h1>{this.state.selectedEvent.group.name}</h1>
                  </div>
                </InfoWindow>
              ) : null}
            </Map>
          </div>
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNfb_UadB3LFS4dbL9hbQRA-6wOV4jJTE"
})(MapLandingPage);
