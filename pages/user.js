import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
import FeedBlock from './components/feedBlock';

import Router from 'next/router';
import popupTools from 'popup-tools';


class user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      avatarSrc: null,
      url: null,
      followers: null,
      done: false,
    };
  }

  componentDidMount() {
    let name = this.props.url.query.name;
    let username = sessionStorage.getItem('searchUser');
    let avatarSrc = sessionStorage.getItem('searchUserAvatar');
    let url = sessionStorage.getItem('searchUserUrl');
    let followers = sessionStorage.getItem('searchUserFollowers');
    if (!username) {
      return Router.push('/login');
    }
    this.setState(
      {
        username,
        avatarSrc,
        url,
        followers,
        done: true,
      }
    );
  }


  render() {
    let spotifyRndr;
    // console.log(this.state.spotifyName);
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
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
                      <div className="icon-position">
                        <div className="camera">
                          <label htmlFor="file">
                          </label>
                        </div>
                      </div>
                      <div />
                    </div>
                    <div className="profile-name">{this.state.username}</div>
                  <button className="ui active button">
                    <i className="user icon"></i>
                    Follow
                  </button>
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
