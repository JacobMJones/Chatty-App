import React, { Component } from 'react';

class ChatBar extends Component {

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Enter your value here" />
                <input className="chatbar-message" onKeyPress={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
            </footer>)
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            console.log('event', event.target.value);
            let chattyMessage = {
                username: this.props.currentUser.name,
                content: event.target.value
            }
            this.props.addMessageToState(chattyMessage);
        }
    }
}


export default ChatBar;