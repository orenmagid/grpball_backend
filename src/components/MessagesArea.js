import React from "react";
import NewMessageForm from "./NewMessageForm";
import moment from "moment";

const MessagesArea = props => {
  let id = props.conversation.id;
  let title = props.conversation.title;
  let messages = props.conversation.messages;
  let user = props.user;
  let users = props.users;

  return (
    <React.Fragment>
      <h2 className="ui header">{title}</h2>

      <div className="ui raised segment chat-window">
        <ul>{orderedMessages(messages, users)}</ul>
      </div>

      <NewMessageForm user={user} conversation_id={id} />
    </React.Fragment>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = (messages, users) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    let messageAuthor;
    if (users) {
      messageAuthor = users.find(user => user.id === message.user_id);
      console.log("messageAuthor", messageAuthor);
    }

    return (
      <React.Fragment>
        <div className="ui comments" key={message.id}>
          <div className="comment">
            <a className="avatar">
              <img src="../noun_basketball_player_1646799-dark-rounded.svg" />
            </a>
            <div className="content">
              <a className="author">
                {messageAuthor ? messageAuthor.first_name : null}
              </a>
              <div className="metadata">
                <div className="date">
                  {moment(message.created_at).calendar()}
                </div>
              </div>
              <div className="text">{message.text}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    // <li key={message.id}>{message.text}</li>;
  });
};
