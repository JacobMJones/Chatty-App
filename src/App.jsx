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
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  this.socket = null;

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3002');
    this.socket.addEventListener('open', () => {
      this.socket.send('Hello Server!');
    })
    this.socket.onopen = event => {
       this.socket.send("socket onopen");
      console.log('it wek');
     };
    
 
  }


  addMessageToState = chattyMessage => {
    console.log('returned chatty message', chattyMessage);
    const messages = this.state.messages.concat(chattyMessage);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(chattyMessage));
  };


  render() {
    const { currentUser, messages, id } = this.state;

    return (
      <div>
        <NavBar />
        <MessageList messages={messages} id={id} />
        <ChatBar currentUser={currentUser} addMessageToState={this.addMessageToState} />

      </div>
    )

  }
}


export default App;



