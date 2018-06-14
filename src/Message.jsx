import React, { Component } from 'react';
class Message extends Component {

  render() {
    console.log('props In Message', this.props);
    if (this.props.type === 'incomingMessage') {

      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content"> {this.props.content} </span>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div class="notification">
            <span class="notification-content">{this.props.oldUserName} changed their name to {this.props.username}.</span>
          </div>
        </div>
      );
    }

  }
}
export default Message;