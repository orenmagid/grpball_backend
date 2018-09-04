import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

export default class EditUserProfile extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    location: "",
    phone: "",
    age: "",
    height: ""
  };

  componentDidMount() {
    this.setState({
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      username: this.props.user.username,
      email: this.props.user.email,
      phone: this.props.user.phone_number,
      location: this.props.user.location,
      age: this.props.user.age,
      height: this.props.user.height_in_inches
    });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let {
      handleCloseClick,
      handleCreateOrEditUser,
      displayNewUserForm
    } = this.props;
    // const options = [
    //   { key: "tb", text: "Total Beginner", value: "Total Beginner" },
    //   { key: "pu", text: "Only Pickup", value: "Only Pickup" },
    //   { key: "ob", text: "Some Organized Ball", value: "Some Organized Ball" },
    //   { key: "hs", text: "High School Ball", value: "High School Ball" },
    //   { key: "cb", text: "College Ball", value: "College Ball" },
    //   { key: "pb", text: "Professional Ball", value: "Professional Ball" }
    // ];

    if (!displayNewUserForm && !localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <Segment>
          <i className="window close icon" onClick={handleCloseClick} />
          <Form onSubmit={e => handleCreateOrEditUser(e, this.props.user)}>
            <Form.Group widths="equal">
              <Form.Input
                name="first_name"
                fluid
                label="First name"
                placeholder="First name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
              <Form.Input
                name="last_name"
                fluid
                label="Last name"
                placeholder="Last name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="username"
                fluid
                label="Username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                name="email"
                fluid
                label="Email Address"
                placeholder="Email
                Address"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="phone"
                fluid
                label="Phone Number"
                placeholder="Phone Number"
                type="Phone Number"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="location"
                fluid
                label="Location"
                placeholder="Location"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="age"
                fluid
                label="Age"
                placeholder="Age"
                type="number"
                value={this.state.age}
                onChange={this.handleChange}
              />

              <Form.Input
                name="height"
                fluid
                label="Height (in Inches)"
                placeholder="Height (in Inches)"
                type="number"
                value={this.state.height}
                onChange={this.handleChange}
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
            <Button secondary basic type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
