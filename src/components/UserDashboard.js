import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, List, Image, Grid } from "semantic-ui-react";

const extra = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);

const UserDashboard = ({ user }) => (
  <Card fluid>
    <Image src="../noun_basketball_player_1646799-transparent-background.svg" />
    <Card.Content>
      <Card.Header>{user.first_name + " " + user.last_name}</Card.Header>
      <Card.Meta>
        <div>{"Username:" + " " + user.username}</div>
      </Card.Meta>
      {/* <Card.Description>{user.first_name} is a baller!</Card.Description> */}
      <div className="top-margin">
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <List horizontal>
                <List.Item>
                  <List.Icon name="marker" />
                  <List.Content>{user.location}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>
                    <a href={"mailto:" + user.email}>{user.email}</a>
                  </List.Content>
                </List.Item>
                {user.phone_number ? (
                  <List.Item>
                    <List.Icon name="phone" />
                    <List.Content>{user.phone_number}</List.Content>
                  </List.Item>
                ) : null}
              </List>
            </Grid.Column>
            <Grid.Column>
              <List horizontal>
                {user.age ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>{user.age} years old</List.Content>
                  </List.Item>
                ) : null}
                {user.height_in_inches ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>
                      {user.height_in_inches} inches tall
                    </List.Content>
                  </List.Item>
                ) : null}
                {user.highest_experience ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>
                      Level of experience: {user.highest_experience}
                    </List.Content>
                  </List.Item>
                ) : null}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Card.Content>
    <Card.Content extra={extra}>
      <Link to={`/groupdashboard`}>
        <a>
          <Icon name="group" />
          {user.user_groups.length}{" "}
          {user.user_groups.length > 1 ? "groups" : "group"}
        </a>
      </Link>
    </Card.Content>
  </Card>
);

export default UserDashboard;
