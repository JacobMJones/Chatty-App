import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageItem = this.props.messages.map( message => (
      <Message key={message.id} m={message} type ={message.type} oldUserName={message.oldUserName} username={message.username} content={message.content} key={message.id}/>
    ));
    return (
      <main className="messages">
        {messageItem}     
      </main>
    );
  }
}
export default MessageList;
