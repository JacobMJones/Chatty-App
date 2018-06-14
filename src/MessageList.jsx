import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('in message list', this.props.messages);
    const messageItem = this.props.messages.map( message => (
      <Message type ={message.type} oldUserName={message.oldUserName} username={message.username} content={message.content} key={message.id}/>
    ));
    return (
      <main className="messages">
        {messageItem}
       
      </main>
    );
  }
}
export default MessageList;
