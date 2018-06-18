import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userCount: 0,
      currentUser: { name: "Anonymous" },
      messages: [],
    };
    this.socket = null;
  }

//If the component mounts then this code will run
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('connected to server');
    };
//this adds an event listener, when messages come in the switch will decide what to do with them
    this.socket.addEventListener('message', (event) => {
      let message = JSON.parse(event.data);
    
      switch (message.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(message);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          const notification = this.state.messages.concat(message);
          this.setState({ messages: notification });
          break;
        case "connections":
          this.setState({ userCount: message.count });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    })
  }
//This sends notification messages
  sendNotificationMessage = notificationMessage => {
    const current = { name: notificationMessage.username };
    this.setState({ currentUser: current });
    this.socket.send(JSON.stringify(notificationMessage));
  }

  addMessageToState = chattyMessage => {
    this.socket.send(JSON.stringify(chattyMessage));
  };
//This will render the page's HTML
  render() {
    const { currentUser, messages, id, type, userCount } = this.state;
    return (
      <div>
        <NavBar userCount={userCount} />
        <MessageList messages={messages}  />
        <ChatBar currentUser={currentUser} addMessageToState={this.addMessageToState} sendNotificationMessage={this.sendNotificationMessage} />
      </div>
    )
  }
}
//this exports the app component
export default App;



