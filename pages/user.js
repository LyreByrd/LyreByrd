import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
import FeedBlock from './components/feedBlock';
import { withRouter } from 'next/router'

import Router from 'next/router';
import popupTools from 'popup-tools';


class user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      avatarSrc: null,
      url: null,
      followers: null,
      isFollowing: false,
      done: false,
    };
    this.followUser = this.followUser.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
    this.checkIfFollowing = this.checkIfFollowing.bind(this);
    this.unFollowUser = this.unFollowUser.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isFollowing === this.state.isFollowing) {
      this.getFollowers();
    }
  }

  componentDidMount() {
    let username = sessionStorage.getItem('searchUser');
    let avatarSrc = sessionStorage.getItem('searchUserAvatar');
    let url = sessionStorage.getItem('searchUserUrl');
    if (!username) {
      return Router.push('/login');
    }
    this.setState({
      username,
      avatarSrc,
      url,
      done: true,
    }, () => {
      this.getFollowers();
      this.checkIfFollowing()
    });
  }

  followUser() {
    let user = localStorage.getItem('username');
    let host = this.state.username;
    axios.post('/user/followHost', {
      user,
      host, 
    })
    .then(res => {
      this.setState({
        isFollowing: true
      }, () => {
        this.getFollowers();
      })
    })
    .catch(err => {
      console.log('error following user :', err);
    })
  }

  unFollowUser() {
    let user = localStorage.getItem('username');
    let host = this.state.username;
    axios.post('/user/unFollowHost', {
      user,
      host,
    })
    .then(res => {
      this.setState({
        isFollowing: false,
      }, () => {
        this.getFollowers();
      })
    })
    .catch(err => {
      console.log('err :', err);
    })
  }

  getFollowers() {
    let user = this.state.username;
    axios.get('/user/followers', {
      params: {
        user
      }
    })
    .then(res => {
      this.setState({
        followers: res.data,
      })
    })
    .catch(err => {
      console.log('error getting user followers :', err);
    })
  }

  checkIfFollowing() {
    let user = localStorage.getItem('username');
    let host = this.state.username;
    axios.get('/user/following', {
      params: {
        user: user,
      }
    })
    .then(followingArray => {
      if (followingArray.data.includes(host)) {
        this.setState({
          isFollowing: true,
        })
      }
    })
    .catch(err => {
      console.log('error getting follows :', err);
    })
  }

  render() {
    // let spotifyRndr;
    if (!this.state.done) {
      return (
        <Layout>
          <div className="ui active inverted dimmer">
            <div className="ui massive text loader">Loading</div>
          </div>
        </Layout>
      );
    } else {
      return (
        <div className="body">
          <Layout>
            <div className="ethan">
              <div className="container">
                <div className="hero">
                  <div className="profile-hero">
                    <div className="avatar">
                      <img
                        className="avatar-img"
                        src={this.state.avatarSrc}
                        width="200"
                        height="200"
                      />
                      <div />
                    </div>
                    <div className="profile-name">
                      {this.state.username}
                      <div className='followers'>
                        {this.state.followers ? `Followers: ${this.state.followers.length}` : ''}
                      </div>
                    </div>
                  <div>
                    {this.state.isFollowing ?
                      <button 
                        className="ui active button"
                        onClick={this.unFollowUser}>
                        <i className="user icon"></i>
                        Unfollow
                      </button>
                      :
                      <button 
                        className="ui active button"
                        onClick={this.followUser}>
                        <i className="user icon"></i>
                        Follow
                      </button>

                    }
                  </div>  
                  </div>
                </div>
                <div className="links">
                  <div className="feed-links">
  
                  </div>
                </div>
              </div>
              <div className="profile-feed">
                <div className="main">
                  <FeedBlock />
                  <FeedBlock />
                </div>
                <div className="sidebar">Sidebar</div>
              </div>
            </div>
          </Layout>
          <style jsx>{`
            .body {
              font-size: 62.5%;
            }
            .ethan {
              display: grid;
              grid-template-rows: 400px, 100px, 400px;
              background-color: #dfdcd4;
            }
            .container {
              display: grid;
              grid-template-rows: repeat(auto-fill, minmax(14rem, 1fr));
              grid-template-columns: auto;
              background-color: white;
              margin: 0 100px 0 100px;
            }

            .hero {
              background: linear-gradient(#243b55, #141e30);
              grid-row-start: 1;
              position: relative;
              overflow: hidden;
              padding: 3rem;
              width: 100%;
            }

            .profile-hero {
              display: grid;
              grid-template-columns: auto 1fr;
              grid-gap: 1rem;
              height: 100%;
              width: 100%;
              margin: 0 auto;
              overflow: hidden;
            }

            .avatar {
              grid-column-start: 1;
              display: block;
              position: relative;
            }

            .icon-position {
              width: -20%;
              height: 20%;
              position: absolute;
              right: 0;
              top: 0;
              padding: 2px 5px 0 0;
            }

            .camera {
              grid-column-start: 1;
              float: right;
              width: 20px;
              height: 20px;
              text-decoration: none;
              color: red;
              cursor: pointer;
            }

            .camera > input {
              display: none;
            }
            .camera:hover {
              opacity: 0.3;
            }

            .camera-svg {
              color: red;
            }

            .profile-name {
              grid-column-start: 2;
              color: #eee;
              height: 10rem;
              width: 100%;
              font-size: 2.4rem;
              font-weight: 10rem;
              line-height: 3.7rem;
              text-transform: uppercase;
              letter-spacing: 0.1rem;
            }

            .followers {
              color: #eee;
              font-size: 1.4rem;
              font-weight: 4rem;
              line-height: 3.7rem;
              text-transform: uppercase;
              letter-spacing: 0.1rem;
            }

            .links {
              grid-row-start: 2;
              position: relative;
              height: 3.2rem;
              margin: 0 1rem 0 1rem;
              line-height: 3.2rem;
              border-bottom: 0.1rem solid #dfdcd4;
              padding-bottom: 0.5px;
            }

            .feed-links {
              display: grid;
              grid-template-columns: 8rem 6rem 6rem;
            }

            .player {
              grid-column-start: 3;
            }

            .btn {
              text-transform: uppercase;
              vertical-align: bottom;
              color: black;
              font-size: 1.125rem;
              height: 3.2rem;
              text-align: left;
              letter-spacing: 2px;
            }

            .btn:hover {
              color: red;
              border-bottom: 1px solid red;
            }

            .profile-feed {
              display: grid;
              grid-template-columns: 1fr 40rem;
              grid-row-start: 3;
              margin: 0 100px 0 100px;
            }

            .main {
              grid-column-start: 1;
              background-color: white;
              border-right: 1px solid #dfdcd4;
              padding-right: 0.5rem;
            }

            .sidebar {
              grid-column-start: 2;
              background-color: white;
            }
          `}</style>
        </div>
      );
    }
  }
}
export default user;
