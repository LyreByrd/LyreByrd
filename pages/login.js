import Router from 'next/router';
import React from 'react';
import axios from 'axios';
import NavBar from './components/NavBar.js';

class Login extends React.Component {
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
    axios.post('/auth/login', {
      username: this.state.username, 
      password: this.state.password
    })
    .then((res) => {
      // console.log(JSON.stringify(res.data));
      Router.push('/feed');
    })
    .catch((err) => {
      console.log(err);
    });
    e.preventDefault();
  }
  // handleYTSubmit(e) {
  //   axios.get('/auth/google')
  //   .then((res) => {
  //     console.log(JSON.stringify(res.data));
  //     // Router.push('/feed');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   e.preventDefault();
  // }

  render() {
    return (
      <div>
      <header>
        <NavBar/>
      </header>
      <form onSubmit={this.handleSubmit}>
        <h1> Login </h1>
        <div>
          <input type='username' 
            value={this.state.username} 
            onChange={this.onUserChange}/>
        </div>
        <div>
          <input type='password' 
            value={this.state.password} 
            onChange={this.onPssChange}
          />
        </div>
        <div>
          <input type='submit' onClick={this.handleSubmit}/>
        </div>
      </form>
        <div>
          <a href='/auth/youtube'>login with youtube</a>
          <a href='/auth/spotify'>login with spotify</a>
        </div>
      </div>
    )
  }

}

export default Login;