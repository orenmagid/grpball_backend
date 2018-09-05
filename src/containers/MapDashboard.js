import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Checkbox, Grid, Label, Header } from "semantic-ui-react";
import CalendarSessionInfo from "../components/CalendarSessionInfo";
import InteractiveSegment from "../components/InteractiveSegment";
import GroupCardMinimalDisplay from "../components/GroupCardMinimalDisplay";
import UserInfo from "../components/UserInfo";
import MediaQuery from "react-responsive";

// const baseUrl = "http://localhost:3000/api/v1";
const baseUrl = "https://grpball-backend.herokuapp.com/api/v1";

export class MapDashboard extends Component {
  state = {
    selectedEvent: null,
    selectedGroup: null,
    displayedUser: null,
    userPosition: null,
    currentRsvp: "",
    formToShow: "none",
    whatToDisplayOnMap: "yourSessions"
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
  onMarkerClick = (props, marker, e) => {
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
        this.setState({
          selectedGroup: null,
          selectedEvent: props.session,
          currentRsvp: myRsvp ? myRsvp : ""
        });
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
        this.setState({
          selectedGroup: props.group,
          selectedEvent: null,
          currentRsvp: ""
        });
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

  render() {
    const { user, sessions, groups, users } = this.props;

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

    switch (this.state.whatToDisplayOnMap) {
      case "allSessions":
        markers = sessions.map(session => {
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
      case "yourSessions":
        let groupIds = user.groups.map(group => group.id);
        groupIds = groupIds.filter(groupId => groupId !== "undefined");
        markers = sessions.map(session => {
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
            />
          );
        });
        break;
    }

    console.log("markers", markers);

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
                  sessions={sessions}
                  group={this.state.selectedGroup}
                  user={user}
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
                <Map
                  google={this.props.google}
                  zoom={11}
                  initialCenter={
                    this.state.userPosition
                      ? this.state.userPosition
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
              sessions={sessions}
              group={this.state.selectedGroup}
              user={user}
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
            <Map
              google={this.props.google}
              zoom={11}
              initialCenter={
                this.state.userPosition
                  ? this.state.userPosition
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
})(MapDashboard);
