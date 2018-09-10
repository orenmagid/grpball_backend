import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationSearchInputForMap from "../components/LocationSearchInputForMap";
import { Checkbox, Grid, Label, Header, Popup } from "semantic-ui-react";
import CalendarSessionInfo from "../components/CalendarSessionInfo";
import InteractiveSegment from "../components/InteractiveSegment";
import GroupCardMinimalDisplay from "../components/GroupCardMinimalDisplay";
import UserInfo from "../components/UserInfo";
import MediaQuery from "react-responsive";
import moment from "moment";

import { baseUrl } from "../constants";

export class MapDashboard extends Component {
  state = {
    selectedEvent: null,
    selectedGroup: null,
    displayedUser: null,
    hoveredEvent: null,
    hoveredGroup: null,
    hoveredUser: null,
    userPosition: null,
    currentRsvp: "",
    formToShow: "none",
    whatToDisplayOnMap: "yourSessions",
    groupUsers: [],
    activeMarker: {},
    showingInfoWindow: false,
    searchPosition: null,
    zoomType: null
  };

  captureAddress = latLng => {
    console.log("latLng", latLng);
    this.setState({
      searchPosition: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    });
  };

  captureZoomType = resultsTypes => {
    console.log("resultsTypes", resultsTypes);
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

  fetchGroup = group => {
    console.log("Inside fetchGroup");
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(group => {
          this.setState({
            selectedGroup: group,
            groupUsers: group.users,
            selectedEvent: null,
            currentRsvp: "",
            showingInfoWindow: true
          });
        });
    }
  };
  onMarkerClick = (props, marker, e) => {
    console.log("Inside onMarkerClick");
    console.log("props", props);
    if (props.session) {
      if (
        this.state.selectedEvent &&
        this.state.selectedEvent.id === props.session.id
      ) {
        this.setState({ selectedEvent: null, currentRsvp: "" });
      } else {
        let myRsvp = props.session.rsvps.find(
          rsvp => rsvp.user_id === this.props.user.id
        );
        let token = localStorage.getItem("token");
        if (token) {
          fetch(baseUrl + `/groups/${props.session.group.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(group => {
              this.setState({
                groupUsers: group.users,
                selectedGroup: null,
                selectedEvent: props.session,
                currentRsvp: myRsvp ? myRsvp : ""
              });
            });
        }
      }
    } else if (props.group) {
      if (
        this.state.selectedGroup &&
        this.state.selectedGroup.id === props.group.id
      ) {
        this.setState({
          selectedEvent: null,
          selectedGroup: null,
          currentRsvp: ""
        });
      } else {
        this.fetchGroup(props.group);
      }
    } else if (props.user) {
      if (
        this.state.displayedUser &&
        this.state.displayedUser.id === props.user.id
      ) {
        this.setState({
          displayedUser: null,
          selectedEvent: null,
          currentRsvp: ""
        });
      } else {
        this.setState({
          displayedUser: props.user,
          selectedEvent: null,
          currentRsvp: ""
        });
      }
    }
  };

  // onMouseoverMarker = (props, marker, e) => {
  //   // e.preventDefault;
  //   // console.log("mouseover marker");
  //   // if (props.group && !this.state.activeMarker) {
  //   //   this.setState({ activeMarker: marker });
  //   // } else if (props.session && !this.state.activeMarker) {
  //   //   this.setState({ activeMarker: marker });
  //   // }
  //   // if (!this.state.showingInfoWindow) {
  //   //   this.setState({ showingInfoWindow: true });
  //   // }
  //   if (props.session) {
  //     if (
  //       this.state.hoveredEvent &&
  //       this.state.hoveredEvent.id === props.session.id
  //     ) {
  //       this.setState({
  //         hoveredEvent: null,
  //         showingInfoWindow: false
  //       });
  //     } else {
  //       let myRsvp = props.session.rsvps.find(
  //         rsvp => rsvp.user_id === this.props.user.id
  //       );
  //       let token = localStorage.getItem("token");
  //       if (token) {
  //         fetch(baseUrl + `/groups/${props.session.group.id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         })
  //           .then(res => res.json())
  //           .then(group => {
  //             this.setState({
  //               groupUsers: group.users,
  //               hoveredGroup: null,
  //               hoveredEvent: props.session,
  //               currentRsvp: myRsvp ? myRsvp : "",
  //               showingInfoWindow: true,
  //               activeMarker: marker
  //             });
  //           });
  //       }
  //     }
  //   } else if (props.group) {
  //     if (
  //       this.state.hoveredGroup &&
  //       this.state.hoveredGroup.id === props.group.id
  //     ) {
  //       this.setState({
  //         hoveredEvent: null,
  //         hoveredGroup: null,
  //         currentRsvp: "",
  //         showingInfoWindow: false
  //       });
  //     } else {
  //       this.fetchGroup(props.group);
  //     }
  //   } else if (props.user) {
  //     if (
  //       this.state.displayedUser &&
  //       this.state.displayedUser.id === props.user.id
  //     ) {
  //       this.setState({
  //         hoveredUser: null,
  //         hoveredEvent: null,
  //         currentRsvp: "",
  //         showingInfoWindow: false
  //       });
  //     } else {
  //       this.setState({
  //         hoveredUser: props.user,
  //         hoveredEvent: null,
  //         currentRsvp: "",
  //         showingInfoWindow: true,
  //         activeMarker: marker
  //       });
  //     }
  //   }
  // };

  windowHasClosed = () => {
    this.setState({ showingInfoWindow: false });
  };

  handleSelectEvent = event => {
    if (this.state.selectedEvent && this.state.selectedEvent.id === event.id) {
      this.setState({ selectedEvent: null });
    } else {
      let myRsvp = event.rsvps.find(
        rsvp => rsvp.user_id === this.props.user.id
      );
      this.setState({
        selectedEvent: event,
        currentRsvp: myRsvp
      });
    }
  };

  handleCloseClick = () => {
    this.setState({
      selectedEvent: null,
      selectedGroup: null,
      displayedUser: null,
      currentRsvp: "",
      formToShow: "none"
    });
  };

  handleRsvpClick = (e, rsvp = null) => {
    e.preventDefault();
    if (rsvp) {
      this.setState({
        currentRsvp: rsvp,
        formToShow: "editRsvp"
      });
    } else {
      this.setState({
        formToShow: "newRsvp"
      });
    }
  };

  handleNewRsvp = (e, sessionId) => {
    console.log("Inside handleNewRsvp");
    e.preventDefault();

    let data = {
      user_id: this.props.user.id,
      session_id: sessionId,
      status: e.target.status.value,
      other_text: e.target.otherText.value
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/rsvps`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.handleFormCloseClick();
        this.handleShowSession(this.state.selectedEvent);
        this.props.handleFetchSessions();
      });
  };

  handleEditRsvp = (e, sessionId, otherText) => {
    console.log("Inside handleEditRsvp");
    e.preventDefault();

    let data = {
      user_id: this.props.user.id,
      session_id: sessionId,
      status: e.target.status.value,
      other_text: otherText
    };
    e.target.reset();
    let token = localStorage.getItem("token");
    fetch(baseUrl + `/rsvps/${this.state.currentRsvp.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        this.props.handleFetchSessions();
        this.handleShowSession(this.state.selectedEvent);
        this.handleFormCloseClick();
      });
  };

  handleShowSession = currentSession => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/sessions/${currentSession.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(session => {
          let myRsvp = session.rsvps.find(
            rsvp => rsvp.user_id === this.props.user.id
          );

          this.setState({
            selectedEvent: session,
            currentRsvp: myRsvp
          });
        });
    }
  };

  handleFormCloseClick = () => {
    this.setState({
      formToShow: "none"
    });
  };

  handleToggle = whatToDisplay =>
    this.setState({
      whatToDisplayOnMap:
        this.state.whatToDisplayOnMap === whatToDisplay ? "" : whatToDisplay,
      selectedEvent: null,
      selectedGroup: null,
      displayedUser: null
    });

  handleShowGroupFromSession = (e, group) => {
    e.preventDefault();
    if (this.state.selectedGroup && this.state.selectedGroup.id === group.id) {
      this.setState({
        selectedEvent: null,
        selectedGroup: null,
        currentRsvp: ""
      });
    } else {
      this.fetchGroup(group);
    }
  };

  render() {
    const { user, sessions, groups, users, handleForceUserUpdate } = this.props;

    let initialCenter =
      user.latitude && user.longitude
        ? {
            lat: user.latitude,
            lng: user.longitude
          }
        : {
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
              onMouseOut={this.onMouseoverMarker}
            />
          );
        });
        break;
      case "yourSessions":
        let groupIds = user.groups.map(group => group.id);
        groupIds = groupIds.filter(groupId => groupId !== "undefined");
        markers = nonCancelledFutureSessions.map(session => {
          if (groupIds.includes(session.group_id)) {
            return (
              <Marker
                key={session.id}
                session={session}
                title={session.group.name}
                name={session.location}
                position={{ lat: session.latitude, lng: session.longitude }}
                onClick={this.onMarkerClick}
                onMouseover={this.onMouseoverMarker}
                onMouseOut={this.onMouseoverMarker}
              />
            );
          }
        });
        markers = markers.filter(marker => marker !== undefined);
        break;
      case "allGroups":
        markers = groups.map(group => {
          return (
            <Marker
              key={group.id}
              group={group}
              title={group.name}
              name={group.location}
              position={{ lat: group.latitude, lng: group.longitude }}
              onClick={this.onMarkerClick}
              onMouseover={this.onMouseoverMarker}
              onMouseOut={this.onMouseoverMarker}
            />
          );
        });
        break;
      case "yourGroups":
        markers = user.groups.map(group => {
          return (
            <Marker
              key={group.id}
              group={group}
              title={group.name}
              name={group.location}
              position={{ lat: group.latitude, lng: group.longitude }}
              onClick={this.onMarkerClick}
              onMouseover={this.onMouseoverMarker}
              onMouseOut={this.onMouseoverMarker}
            />
          );
        });
        break;
      case "users":
        markers = users.map(user => {
          return (
            <Marker
              key={user.id}
              user={user}
              title={user.name}
              name={user.location}
              position={{ lat: user.latitude, lng: user.longitude }}
              onClick={this.onMarkerClick}
              onMouseover={this.onMouseoverMarker}
              onMouseOut={this.onMouseoverMarker}
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
        <MediaQuery minWidth={992}>
          <div className="ui five column grid container segment">
            <div className="column">
              <Checkbox
                slider
                label="All Sessions"
                onChange={() => this.handleToggle("allSessions")}
                checked={this.state.whatToDisplayOnMap === "allSessions"}
              />
            </div>
            <div className="column">
              <Checkbox
                slider
                label="Your Sessions"
                onChange={() => this.handleToggle("yourSessions")}
                checked={this.state.whatToDisplayOnMap === "yourSessions"}
              />
            </div>
            <div className="column">
              <Checkbox
                slider
                label="All Groups"
                onChange={() => this.handleToggle("allGroups")}
                checked={this.state.whatToDisplayOnMap === "allGroups"}
              />
            </div>
            <div className="column">
              <Checkbox
                slider
                label="Your Groups"
                onChange={() => this.handleToggle("yourGroups")}
                checked={this.state.whatToDisplayOnMap === "yourGroups"}
              />
            </div>
            <div className="column">
              <Checkbox
                slider
                label="All Users"
                onChange={() => this.handleToggle("users")}
                checked={this.state.whatToDisplayOnMap === "users"}
              />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={992}>
          <Grid>
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
                  onChange={() => this.handleToggle("yourSessions")}
                  checked={this.state.whatToDisplayOnMap === "yourSessions"}
                />{" "}
                <br />
                <Header as="h5">Your Sessions</Header>
              </Grid.Row>

              <Grid.Row verticalAlign="middle">
                <Checkbox
                  onChange={() => this.handleToggle("allGroups")}
                  checked={this.state.whatToDisplayOnMap === "allGroups"}
                />{" "}
                <br />
                <Header as="h5">All Groups</Header>
              </Grid.Row>
              <Grid.Row verticalAlign="middle">
                <Checkbox
                  onChange={() => this.handleToggle("yourGroups")}
                  checked={this.state.whatToDisplayOnMap === "yourGroups"}
                />{" "}
                <br />
                <Header as="h5">Your Groups</Header>
              </Grid.Row>
              <Grid.Row verticalAlign="middle">
                <Checkbox
                  onChange={() => this.handleToggle("users")}
                  checked={this.state.whatToDisplayOnMap === "users"}
                />{" "}
                <br />
                <Header as="h5">All Users</Header>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={14}>
              {this.state.selectedGroup ? (
                <GroupCardMinimalDisplay
                  handleCloseClick={this.handleCloseClick}
                  sessions={sessions}
                  group={this.state.selectedGroup}
                  user={user}
                  users={this.state.groupUsers}
                  handleFetchGroup={this.fetchGroup}
                  handleForceUserUpdate={handleForceUserUpdate}
                />
              ) : null}

              {this.state.selectedEvent ? (
                <CalendarSessionInfo
                  group={this.state.selectedEvent.group}
                  groupUsers={this.state.groupUsers}
                  handleCloseClick={this.handleCloseClick}
                  handleRsvpClick={this.handleRsvpClick}
                  session={this.state.selectedEvent}
                  rsvp={this.state.currentRsvp}
                  user={this.props.user}
                  handleShowGroupFromSession={this.handleShowGroupFromSession}
                />
              ) : null}
              {this.state.formToShow === "editRsvp" ||
              this.state.formToShow === "newRsvp" ? (
                <InteractiveSegment
                  handleCloseClick={this.handleFormCloseClick}
                  formToShow={this.state.formToShow}
                  session={this.state.selectedEvent}
                  rsvp={this.state.currentRsvp}
                  handleEditRsvp={this.handleEditRsvp}
                  handleNewRsvp={this.handleNewRsvp}
                  group={this.state.selectedGroup}
                  groupUsers={this.state.groupUsers}
                />
              ) : null}
              {this.state.displayedUser ? (
                <UserInfo
                  handleCloseClick={this.handleCloseClick}
                  user={user}
                  displayedUser={this.state.displayedUser}
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
                  {this.state.hoveredEvent ? (
                    <InfoWindow
                      // marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      position={{
                        lat: this.state.activeMarker.latitude,
                        lng: this.state.activeMarker.longitude
                      }}
                      onClose={this.windowHasClosed}
                    >
                      >
                      <div>
                        <h1>
                          {this.state.hoveredEvent
                            ? this.state.hoveredEvent.group.name
                            : null}
                        </h1>
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
              users={this.state.groupUsers}
              handleFetchGroup={this.fetchGroup}
              handleForceUserUpdate={handleForceUserUpdate}
            />
          ) : null}

          {this.state.selectedEvent ? (
            <CalendarSessionInfo
              group={this.state.selectedEvent.group}
              handleCloseClick={this.handleCloseClick}
              handleRsvpClick={this.handleRsvpClick}
              session={this.state.selectedEvent}
              rsvp={this.state.currentRsvp}
              user={this.props.user}
              groupUsers={this.state.groupUsers}
              handleShowGroupFromSession={this.handleShowGroupFromSession}
            />
          ) : null}
          {this.state.formToShow === "editRsvp" ||
          this.state.formToShow === "newRsvp" ? (
            <InteractiveSegment
              handleCloseClick={this.handleFormCloseClick}
              formToShow={this.state.formToShow}
              session={this.state.selectedEvent}
              rsvp={this.state.currentRsvp}
              handleEditRsvp={this.handleEditRsvp}
              handleNewRsvp={this.handleNewRsvp}
              group={this.state.selectedGroup}
              groupUsers={this.state.groupUsers}
            />
          ) : null}
          {this.state.displayedUser ? (
            <UserInfo
              handleCloseClick={this.handleCloseClick}
              user={user}
              displayedUser={this.state.displayedUser}
            />
          ) : null}
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
              {this.state.hoveredEvent ? (
                <InfoWindow
                  // marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  position={{
                    lat: this.state.activeMarker.latitude,
                    lng: this.state.activeMarker.longitude
                  }}
                  onClose={this.windowHasClosed}
                >
                  <div>
                    <h1>
                      {this.state.hoveredEvent
                        ? this.state.hoveredEvent.group.name
                        : null}
                    </h1>
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
})(MapDashboard);
