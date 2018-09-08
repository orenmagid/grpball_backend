import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";
import { Grid, Menu, Segment } from "semantic-ui-react";
import MediaQuery from "react-responsive";

class ChatComponent extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
    activeItem: "",
    activeIndex: "",
    group: [],
    users: []
  };

  handleItemClick = (e, { title }) => {
    console.log("e", e);
    console.log("title", title);
    this.setState({
      activeItem: title
    });
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => {
        console.log("conversations", conversations);
        this.setState({
          conversations: conversations,
          activeConversation: conversations[0].id,
          activeItem: conversations[0].title
        });
      });
  };
  //
  // handleClick = id => {
  //   this.setState({ activeConversation: id });
  // };

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
    const {
      conversations,
      activeConversation,
      activeItem,
      activeIndex
    } = this.state;

    return (
      <div className="ui divided grid ">
        <MediaQuery maxWidth={767}>
          <div className="row">
            <Menu size="tiny" tabular>
              {conversations.map(conversation => {
                return (
                  <Menu.Item
                    key={conversation.id}
                    name={conversation.title}
                    active={activeItem === conversation.title}
                    onClick={e => {
                      this.handleItemClick(e, conversation);
                      this.setState({ activeConversation: conversation.id });
                    }}
                  />
                );
              })}
            </Menu>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={767}>
          <div className="four wide column">
            <Menu size="tiny" fluid vertical tabular="left">
              {conversations.map(conversation => {
                return (
                  <Menu.Item
                    key={conversation.id}
                    name={conversation.title}
                    active={activeItem === conversation.title}
                    onClick={e => {
                      this.handleItemClick(e, conversation);
                      this.setState({ activeConversation: conversation.id });
                    }}
                  />
                );
              })}
            </Menu>
          </div>
        </MediaQuery>
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
        <MediaQuery minWidth={767}>
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
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div className="ui card sixteen wide column">
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
        </MediaQuery>
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
