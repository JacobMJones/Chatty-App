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
      messages: []
      type: '';
    };
  this.socket = null;

  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3002');
   
    this.socket.onopen = event => {
      // this.socket.send("socket onopen");
      console.log('it werks');
     };
     this.socket.addEventListener('message', (event) => {
     let message = JSON.parse(event.data);
     console.log('m', message);
     const messages = this.state.messages.concat(message);
      //const messages = this.state.messages.concat(chattyMessage);
      this.setState({ messages: messages });
    })
  }

  changeUserName = userName => {
    console.log('new username', userName, 'type', typeof userName);
    this.setState({currentUser:userName});
   console.log('state after name change', this.state);
  }
  
  addMessageToState = chattyMessage => {
    console.log('returned chatty message', chattyMessage);
    
    this.socket.send(JSON.stringify(chattyMessage));
  };

  render() {
    const { currentUser, messages, id } = this.state;

    return (
      <div>
        <NavBar />
        <MessageList messages={messages} id={id} />
        <ChatBar currentUser={currentUser} addMessageToState={this.addMessageToState} changeUserName={this.changeUserName} />

      </div>
    )

  }
}


export default App;



