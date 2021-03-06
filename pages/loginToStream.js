import Router from 'next/router';
import React from 'react';
import axios from 'axios';
import Layout from './components/Layout.js';
import Link from 'next/link';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      Token: '',
      done: false
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPssChange = this.onPssChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({
      done: true
    });
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
      console.log(res.data);
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem("username", res.data.username);
      Router.push('/streamType');
    })
    .catch((err) => {
      err = err.response;
      console.log(JSON.stringify(err.statusText));
      console.log(JSON.stringify(err.data.message));
    });
    e.preventDefault();
  }

  render() {
    if (!this.state.done) {
      return (
        <Layout>
            <div class="ui active inverted dimmer">
              <div class="ui massive text loader">Loading</div>
            </div>
        </Layout>
      )
    }
    return (
      <Layout>
        <div className="ui middle aligned center aligned grid" className="login-block">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">
                Log-in to your account
              </div>
            </h2>
            <form className="ui large form" onSubmit={this.handleSubmit}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="username" name="username" placeholder="username" 
                      value={this.state.username} 
                      onChange={this.onUserChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      value={this.state.password} 
                      onChange={this.onPssChange}
                    />
                  </div>
                </div>
                <input value="Login" type="submit" onClick={this.handleSubmit} className="ui fluid large teal submit button"/>
              </div>
              <div className="ui error message"></div>
            </form>
            <div className="ui message">
              New to us? <a href="/signup">Sign Up</a>
            </div>
          </div>
          <style jsx>{`
            .login-block{
              margin-top: 3em;
              margin-left: 25em;
              margin-right: 25em;
            }
          `}</style>
        </div>
      </Layout>

    )
  }

}

export default Login;
