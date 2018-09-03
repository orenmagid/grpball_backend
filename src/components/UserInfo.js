import React from "react";

import { Card, List, Image, Grid } from "semantic-ui-react";

const UserInfo = ({ displayedUser, user, handleCloseClick }) => (
  <Card fluid>
    <Image src="../noun_basketball_player_1646799-transparent-background.svg" />
    <Card.Content>
      <Card.Header>
        {displayedUser.first_name + " " + displayedUser.last_name}
      </Card.Header>
      <Card.Meta>
        <div>{"Username: " + displayedUser.username}</div>
      </Card.Meta>
      {/* <Card.Description>{user.first_name} is a baller!</Card.Description> */}
      <div className="top-margin">
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <List horizontal>
                <List.Item>
                  <List.Icon name="marker" />
                  <List.Content>{displayedUser.location}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>
                    <a href={"mailto:" + displayedUser.email}>
                      {displayedUser.email}
                    </a>
                  </List.Content>
                </List.Item>
                {displayedUser.phone_number ? (
                  <List.Item>
                    <List.Icon name="phone" />
                    <List.Content>{displayedUser.phone_number}</List.Content>
                  </List.Item>
                ) : null}
              </List>
            </Grid.Column>
            <Grid.Column>
              <List horizontal>
                {displayedUser.age ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>{displayedUser.age} years old</List.Content>
                  </List.Item>
                ) : null}
                {displayedUser.height_in_inches ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>
                      {displayedUser.height_in_inches} inches tall
                    </List.Content>
                  </List.Item>
                ) : null}
                {displayedUser.highest_experience ? (
                  <List.Item>
                    <List.Icon name="basketball ball" />
                    <List.Content>
                      Level of experience: {displayedUser.highest_experience}
                    </List.Content>
                  </List.Item>
                ) : null}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Card.Content>
  </Card>
);

export default UserInfo;
