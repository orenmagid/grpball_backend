import React from "react";
import { Segment } from "semantic-ui-react";
import SessionInfo from "./SessionInfo";
import UserInfo from "./UserInfo";

const Info = ({
  group,
  session,
  rsvp,
  user,
  displayedUser,
  handleRsvpClick,
  handleCloseClick
}) => (
  <Segment>
    {session ? (
      <SessionInfo
        group={group}
        handleCloseClick={handleCloseClick}
        handleRsvpClick={handleRsvpClick}
        session={session}
        rsvp={rsvp}
        user={user}
      />
    ) : null}
    {displayedUser ? (
      <UserInfo
        handleCloseClick={handleCloseClick}
        user={user}
        displayedUser={displayedUser}
      />
    ) : null}
  </Segment>
);

export default Info;
