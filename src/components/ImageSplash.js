import React from "react";
import { Link } from "react-router-dom";
import { Image, Reveal, Segment } from "semantic-ui-react";

const ButtonExampleSize = ({ createNewUser }) => (
  <React.Fragment>
    <div className="ui vertical stripe segment">
      <div className="ui text container">
        <h1 className="ui header">GRPBALL</h1>
        <h2>Are you ready to play?</h2>
        <Link to={`/new_user`}>
          <div className="ui huge primary button" onClick={createNewUser}>
            Create an Account <i className="right arrow icon" />
          </div>
        </Link>
      </div>
    </div>
    <div className="ui vertical masthead center aligned segment">
      <Image src="../grpball-splash.png" size="huge" centered />
    </div>
    <div className="ui vertical stripe segment">
      <div className="ui middle aligned stackable grid container">
        <div className="row">
          <div className="eight wide column">
            <h3 className="ui header">
              Need a little help coordinating with your friends?
            </h3>
            <p>
              We make scheduling, communicating about, and confirming your
              availability for basketball easy. We can't help you with your
              jumpshot, though. Sorry.
            </p>
            <h3 className="ui header">Tired of one-on-none?</h3>
            <p>Find a local group to join.</p>
          </div>
          <div className="six wide right floated column">
            <h3 className="ui header">Need a new addition to your group?</h3>
            <p>
              Does your group of ballers need some free agents? Find other local
              players and invite them to join you.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="center aligned column">
            <Link to={`/map_splash`}>
              <a className="ui huge primary button">
                See Who's Playing Near You <i className="right arrow icon" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default ButtonExampleSize;
