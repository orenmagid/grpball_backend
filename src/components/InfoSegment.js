import React from "react";
import { Segment } from "semantic-ui-react";
import EditRsvpForm from "./EditRsvpForm";
import NewRsvpForm from "./NewRsvpForm";
import SessionInfo from "./SessionInfo";

const Info = ({
  group,
  session,
  rsvp,
  user,
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
  </Segment>
);

export default Info;
