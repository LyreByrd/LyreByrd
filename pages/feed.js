import Layout from './components/Layout.js';
import React from 'react';
import axios from 'axios';
import Block from './components/block';
import io from 'socket.io-client';


export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
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

  componentDidUpdate() {

  }


  

  getFeeds() {
    const socket = io('https://18.188.27.120:8080'); //todo change to production.env host
    const chatSocket = io('https://18.188.27.120:8000');

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
            <div className="feed heading popular">
              <Block 
                feeds={this.state.feeds}
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
