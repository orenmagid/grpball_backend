import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import LocationSearchInput from "./LocationSearchInput";

export default class NewUserForm extends Component {
  state = {
    address: "",
    experience: "",
    latitude: "",
    longitude: ""
  };

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

  handleChange = (e, { value }) => this.setState({ experience: value });

  render() {
    let { handleCreateOrEditUser, displayNewUserForm } = this.props;
    const options = [
      { key: "tb", text: "Total Beginner", value: "Total Beginner" },
      { key: "pu", text: "Only Pickup", value: "Only Pickup" },
      { key: "ob", text: "Some Organized Ball", value: "Some Organized Ball" },
      { key: "hs", text: "High School Ball", value: "High School Ball" },
      { key: "cb", text: "College Ball", value: "College Ball" },
      { key: "pb", text: "Professional Ball", value: "Professional Ball" }
    ];

    let token = localStorage.getItem("token");
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <Segment inverted>
          <Form
            inverted
            onSubmit={e =>
              handleCreateOrEditUser(
                e,
                this.state.address,
                this.state.latitude,
                this.state.longitude,
                this.state.experience
              )
            }
          >
            <Form.Group widths="equal">
              <Form.Input
                name="first_name"
                fluid
                label="First name"
                placeholder="First name"
              />
              <Form.Input
                name="last_name"
                fluid
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="username"
                fluid
                label="Username"
                placeholder="Username"
              />
              <Form.Input
                name="email"
                fluid
                label="Email Address"
                placeholder="Email
                Address"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="password"
                fluid
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                name="phone"
                fluid
                label="Phone Number"
                placeholder="Phone Number"
                type="Phone Number"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <LocationSearchInput
                type="user"
                captureAddress={this.captureAddress}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="age"
                fluid
                label="Age"
                placeholder="Age"
                type="number"
              />

              <Form.Input
                name="height"
                fluid
                label="Height (in Inches)"
                placeholder="Height (in Inches)"
                type="number"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                name="experience"
                label="Highest Level of Experience"
                options={options}
                placeholder="Highest Level of Experience"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
            <Button inverted secondary basic type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
