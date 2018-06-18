import React, { Component } from 'react';
class NavBar extends Component {
  render() {
    return(    
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        
        <h2 className="navbar-usercount">Users:{this.props.userCount}</h2>
      </nav>)
  }
}
export default NavBar;