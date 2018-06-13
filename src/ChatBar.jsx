import React, { Component } from 'react';

class ChatBar extends Component {

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" onKeyPress={this.handleKeyPressChangeName} placeholder="Enter your value here" />
                <input className="chatbar-message" onKeyPress={this.handleKeyPressSendContent} placeholder="Type a message and hit ENTER" />
            </footer>)
    }

    handleKeyPressSendContent = (event) => {
        
        if (event.key == 'Enter') {
           
            let chattyMessage = {
                
                username: this.props.currentUser.name,
                content: event.target.value
            }
            this.props.addMessageToState(chattyMessage);
            event.target.value ="";
        }
    }
    handleKeyPressChangeName = (event) => {
        let name = event.target.value;
        if (event.key == 'Enter') {
            console.log('event', event.target.value);

            let u = {
                name: event.target.value              
            }
            this.props.changeUserName(u);
         
        }
        console.log('current', this.props.currentUser.name);


    }
}


export default ChatBar;