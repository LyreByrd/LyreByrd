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
    }, () => {
      this.getFollowingFeeds();
    })
  }
  
  componentDidUpdate() {
    // this.getFollowingFeeds();
  }

  getFeeds() {
    const socket = io(`${config.PROXY_IP}:8080`, {secure: true});
    const chatSocket = io(`${config.PROXY_IP}:8000`, {secure: true});

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
        }, () => {
          this.getFollowingFeeds();
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
            <div class="ui active inverted dimmer">
              <div class="ui massive text loader">Loading</div>
            </div>
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
            grid-template-columns: 8fr 2fr;
            grid-auto-flow: row dense;
            background-color: white;
            height: 2000.75px;
            margin: 0 100px 0 100px;
            padding: 46px 30px 0 30px;
          }

          .feed {
            display: grid;
            grid-row-start: 1;
            grid-auto-rows: 327px;
            width: 100%;
            padding: 10px;
            grid-gap 5px;
          }

          .sidebar {
            border-left: 1px solid #dfdcd4;
          }
        `}</style>
      </div>
    );
  }
}
//  export default feed
