import React, { Component } from 'react';
class Message extends Component {
  render() {
    return (
        <div className="message">
          {
            (this.props.type === 'incomingMessage')
            ? <div><span className="message-username">{this.props.username}</span>
              <span className="message-content"> {this.props.content} </span></div>
            : <div className="message">
              <span className="notification">{this.props.oldUserName} changed their name to {this.props.username}.</span>
            </div>
          }
        </div>   
    );
  }
}
export default Message;
