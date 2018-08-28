import React, { Component } from "react";
import { List, Icon } from "semantic-ui-react";

const baseUrl = "http://localhost:3000/api/v1";

export default class GroupCard extends Component {
  state = {
    group: null,
    users: []
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + `/groups/${this.props.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(group => {
          this.setState({
            group: group,
            users: group.users
          });
        });
    }
  }

  render() {
    const { user } = this.props;
    let group = this.state.group;
    let users = this.state.users;

    return (
      <div className="card">
        <div className="image">
          <img src="../noun_Basketball_1671463-round-white-background.svg" />
        </div>
        <div className="content">
          <div className="header">{this.props.group.name}</div>
          <div className="meta">{this.props.group.location}</div>
          {/* <div className="description">
            Matthew is an interior designer living in New York.
          </div> */}
          <List horizontal>
            {users.map(user => {
              return (
                <List.Item>
                  <List.Icon name="user" />
                  <List.Content>
                    {user.first_name + " " + user.last_name}
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </div>
        <div className="extra content">
          <span className="right floated">Joined in 2013</span>
          <span className="left floated">
            <i className="user icon" />
            {users.length > 0 ? users.length + " members" : null}
          </span>
        </div>
      </div>
    );
  }
}
