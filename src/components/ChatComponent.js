import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";

class ChatComponent extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => {
        console.log("conversations", conversations);
        this.setState({ conversations });
      });
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="ui raised segment divided grid ">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="raised segment four wide column">
          <div className="row">
            <h4 className="ui header">Conversations</h4>
            <div className="ui list">
              {mapConversations(conversations, this.handleClick)}
            </div>
          </div>
          {/* <div className="row top-margin">
            <NewConversationForm user={this.props.user} />
          </div> */}
        </div>

        <div className="ui card twelve wide column">
          {activeConversation ? (
            <MessagesArea
              user={this.props.user}
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

export default ChatComponent;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      // <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
      //   {conversation.title}
      // </li>
      <a
        className="item"
        key={conversation.id}
        onClick={() => handleClick(conversation.id)}
      >
        <i className="chat icon" />
        <div className="content">
          <div className="header">{conversation.title}</div>
        </div>
      </a>
    );
  });
};
