import React from "react";
import { Segment } from "semantic-ui-react";
import EditRsvpForm from "./EditRsvpForm";
import NewRsvpForm from "./NewRsvpForm";
import SessionInfo from "./SessionInfo";

const Info = ({
  group,
  session,
  rsvp,

  handleCloseClick
}) => (
  <Segment>
    {session ? (
      <SessionInfo
        group={group}
        handleCloseClick={handleCloseClick}
        session={session}
      />
    ) : null}
  </Segment>
);

export default Info;
