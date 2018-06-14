import React, { Component } from 'react';
class Message extends Component {
  render() {
    return (  
        <div>
          {
            (this.props.type === 'incomingMessage')
            ? <div key={this.props.m.key} className="message"><span className="message-username">{this.props.username}</span>
              <span  className="message-content"> {this.props.content} </span></div>
            : <div key={this.props.m.key} className="message">
              <span  className="notification">{this.props.oldUserName} changed their name to {this.props.username}.</span>
            </div>
          }
        </div>   
    );
  }
}
export default Message;
