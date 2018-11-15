import React from 'react';
import NavBar from './components/NavBar.js';

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount(){
    this.setState({ 
      username: localStorage.getItem('username')
    });
  }

  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <h1>Hi {this.state.username}</h1>
      </div>
    );
  }
}

export default profile;