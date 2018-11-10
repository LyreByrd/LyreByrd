import Router from 'next/router';
import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPssChange = this.onPssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUserChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPssChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    axios.post('/api/signup', {
      username: this.state.username, 
      password: this.state.password
    })
    .then((res) => {
      console.log(JSON.stringify(res.data));
      Router.push('/feed');
    })
    .catch((err) => {
      console.log(err);
    });
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h1> Signup </h1>
        <input type='username' value={this.state.username} onChange={this.onUserChange}/>
        <input type='password' value={this.state.password} onChange={this.onPssChange}/>
        <input type='submit' onClick={this.handleSubmit}/>
      </form>
    )
  }

}

export default Signup;