import React, { Component } from "react";
import { Card, Form, Radio, Button } from "semantic-ui-react";

import { baseUrl } from "../constants";

export default class ReviewRequestCard extends Component {
  state = {
    request: null,
    value: ""
  };

  componentDidMount() {
    this.fetchRequest();
  }

  fetchRequest = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/requests/${this.props.request.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(request => {
          this.setState({
            request: request
          });
        });
    }
  };

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { request, value } = this.state;

    if (request) {
      return (
        <Card centered>
          <i
            className="window close icon"
            onClick={() => this.props.handleCloseClick()}
          />
          <Card.Content>
            <Card.Header>
              {request.user.first_name + " " + request.user.last_name}
            </Card.Header>

            <Form
              onSubmit={e =>
                this.props.handleAddToGroupSubmit(e, this.state.value)
              }
            >
              <Form.Group inline>
                <label>Add {request.user.first_name} to the group?</label>
                <Form.Field
                  control={Radio}
                  label="Yes"
                  value="Yes"
                  checked={value === "Yes"}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label="No"
                  value="No"
                  checked={value === "No"}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
          </Card.Content>
        </Card>
      );
    }
    return null;
  }
}
