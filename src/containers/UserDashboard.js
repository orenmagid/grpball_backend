import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, List, Image, Grid } from "semantic-ui-react";
import MediaQuery from "react-responsive";

const UserDashboard = ({ user, handleEditProfile }) => (
  <Card fluid>
    <Image src="../noun_basketball_player_1646799-transparent-background.svg" />
    <Card.Content>
      <Card.Header>{user.first_name + " " + user.last_name}</Card.Header>
      <Card.Meta>
        <div>{"Username: " + user.username}</div>
      </Card.Meta>
      {/* <Card.Description>{user.first_name} is a baller!</Card.Description> */}
      <div className="top-margin">
        <MediaQuery minWidth={992}>
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
        </MediaQuery>
        <MediaQuery maxWidth={992}>
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

            {user.age ? (
              <List.Item>
                <List.Icon name="basketball ball" />
                <List.Content>{user.age} years old</List.Content>
              </List.Item>
            ) : null}
            {user.height_in_inches ? (
              <List.Item>
                <List.Icon name="basketball ball" />
                <List.Content>{user.height_in_inches} inches tall</List.Content>
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
        </MediaQuery>
      </div>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two column grid container">
        <div className="column">
          <Link to={`/group_dashboard`}>
            <Icon name="group" />
            {user.user_groups.length}{" "}
            {user.user_groups.length > 1 || user.user_groups.length === 0
              ? "groups"
              : "group"}
          </Link>
        </div>
        <div className="column">
          <a href="edit_profile" onClick={handleEditProfile}>
            <Icon name="write" />
            Edit your Profile
          </a>
        </div>
      </div>
    </Card.Content>
  </Card>
);

export default UserDashboard;
