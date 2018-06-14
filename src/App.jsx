import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

console.log('in app');
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      type: ''
    };
    this.socket = null;

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3002');

    this.socket.onopen = event => {
      console.log('connected to server');
    };

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
        default:

          throw new Error("Unknown event type " + data.type);
      }

    })

  }

  sendNotificationMessage = notificationMessage => {
    console.log('in send notification message', notificationMessage);
    const current = {name : notificationMessage.username};
    this.setState({currentUser: current});
    this.socket.send(JSON.stringify(notificationMessage));
  }

  addMessageToState = chattyMessage => {;
    this.socket.send(JSON.stringify(chattyMessage));
  };

  render() {
    const { currentUser, messages, id, type } = this.state;
    return (
      <div>
        <NavBar />
        <MessageList messages={messages} id={id} type={type} />
        <ChatBar currentUser={currentUser} addMessageToState={this.addMessageToState} sendNotificationMessage={this.sendNotificationMessage} />

      </div>
    )

  }
}


export default App;



