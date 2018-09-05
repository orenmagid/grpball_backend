import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

export default class NewUserForm extends Component {
  render() {
    let { handleCreateOrEditUser, displayNewUserForm } = this.props;
    // const options = [
    //   { key: "tb", text: "Total Beginner", value: "Total Beginner" },
    //   { key: "pu", text: "Only Pickup", value: "Only Pickup" },
    //   { key: "ob", text: "Some Organized Ball", value: "Some Organized Ball" },
    //   { key: "hs", text: "High School Ball", value: "High School Ball" },
    //   { key: "cb", text: "College Ball", value: "College Ball" },
    //   { key: "pb", text: "Professional Ball", value: "Professional Ball" }
    // ];

    let token = localStorage.getItem("token");
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <Segment inverted>
          <Form inverted onSubmit={handleCreateOrEditUser}>
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
              {/* <Form.Input
                name="password_confirmation"
                fluid
                label="Password Confirmation"
                placeholder="Password Confirmation"
                type="password"
              /> */}
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="location"
                fluid
                label="Location"
                placeholder="Location"
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
            {/* <Form.Group widths="equal">
              <Form.Select
                name="experience"
                label="Highest Level of Experience"
                options={options}
                placeholder="Highest Level of Experience"
              />
            </Form.Group> */}
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
