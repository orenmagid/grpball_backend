import React from "react";

const baseUrl = "http://localhost:3000/api/v1";

class UserPage extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ user: data });
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div>
            <h1>{this.state.user.username}</h1>
            <p>{this.state.user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default UserPage;
