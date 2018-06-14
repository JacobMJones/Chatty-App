import React, { Component } from 'react';

class ChatBar extends Component {

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyPress={this.handleKeyPressChangeName} placeholder="Enter your value here" />
                <input className="chatbar-message" onKeyPress={this.handleKeyPressSendContent} placeholder="Type a message and hit ENTER" />
            </footer>)
    }

    handleKeyPressSendContent = (event) => {
        
        if (event.key == 'Enter') {
           
            let chattyMessage = {
                
                username: this.props.currentUser.name,
                content: event.target.value,
                type:'incomingMessage'
            }
            this.props.addMessageToState(chattyMessage);
            event.target.value ="";
        }
    }
    handleKeyPressChangeName = (event) => {
        
        if (event.key == 'Enter') {
            console.log('change username event', event.target.value);

            let u = {
                oldUserName: this.props.currentUser.name,
                username: event.target.value,   
                type: 'incomingNotification'           
            }
            console.log('u object', u);
            this.props.sendNotificationMessage(u);       
         
        }
        


    }
}


export default ChatBar;