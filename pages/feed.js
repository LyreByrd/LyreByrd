import Layout from './components/Layout.js';
import React from 'react';
import axios from 'axios';
import Block from './components/block';
import io from 'socket.io-client';
let config = require('./config/config.js')


export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      followingFeeds: [],
      done: false
    };
  }

  componentWillMount() {

  }
  
  componentDidMount() {
    this.getFeeds();
    this.setState({
      done: true
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.followingFeeds === this.state.followingFeeds) {
      this.getFollowingFeeds();
    }
  }

  getFeeds() {
    const socket = io(`${config.PROXY_IP}:8080`,
      // {secure: true}
    );
    const chatSocket = io(`${config.PROXY_IP}:8000`,
      // {secure: true}
    );

    socket.on('connect', () => {

      socket.emit('main feed connect');

      socket.on('update feeds', feeds => {
        if (feeds === null) {
          feeds = [];
        }
        const feedsArray = Object.values(feeds).map(feed => {
          let parseFeed = JSON.parse(feed);
          return parseFeed;
        })
        this.setState({
          feeds: feedsArray
        })
      });

      socket.on('update deleted feeds', feeds => {
        if (feeds === null) {
          feeds = [];
        }
        const feedsArray = Object.values(feeds).map(feed => {
          let parseFeed = JSON.parse(feed);
          return parseFeed;
        })
        this.setState({
          feeds: feedsArray
        })
      })
    })
  };

  getFollowingFeeds() {
    let user = localStorage.getItem('username');
    axios.get('/user/following', {
      params: {
        user: user,
      }
    })
    .then(followingArray => {
      console.log('followingArray :', followingArray);
      let allFeeds = this.state.feeds;
      let followingFeeds = allFeeds.filter(feed => {
        return followingArray.data.includes(feed.host);
      })
      this.setState({
        followingFeeds: followingFeeds,
      })
    })
  }

  render() {
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      )
    }
    return (
      <div className="body">
        <Layout>
          <div className="container">
            <div className="feed heading all">
              <Block
                title={'All Feeds'}
                subtitle={'Currently Playing'}
                feeds={this.state.feeds}
              />
            </div>
            <div className="feed heading following">
              <Block
                title={'Following'}
                subtitle={'Currently Playing'}
                feeds={this.state.followingFeeds}
              />
            </div>
            <div className="sidebar" />
          </div>
        </Layout>
        <style jsx>{`
          
          * {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
          box-sizing: border-box;
          }

          .body {
            background-color: #dfdcd4;
          }

          .container {
            display: grid;
            grid-template-columns: 9fr 1.8fr;
            grid-auto-flow: column;
            background-color: white;
            height: 100%;
            margin: 0 100px 0 100px;
            padding: 46px 30px 0 30px;
          }

          .feed {
            display: grid;
            grid-template-columns: 4fr;
            grid-template-rows: 2;
            grid-row-start: 1;
            grid-auto-rows: repeat(auto);
            width: 100%;
            height: auto;
            padding: 10px;
            grid-gap 5px;
          }

          .sidebar {
            border-left: 1px solid #dfdcd4;
            grid-column-start: 2;
            grid-row: 1 / span 2;
          }

          .following {
            grid-column-start: 1;
            grid-row-start: 2;
          }
        `}</style>
      </div>
    );
  }
}
//  export default feed
