import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
      //this breaks out the variables so they can be used by the message component
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
