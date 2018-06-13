import React, { Component } from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

class MessageList extends Component {
  render() {
    const messageItem = this.props.messages.map( message => (
      <Message username={message.username} content={message.content} key={message.id}/>
    ));
    console.log(messageItem)
    return (
      <main className="messages">
        {messageItem}
        <SystemMessage/>
      </main>
    );
  }
}
export default MessageList;
