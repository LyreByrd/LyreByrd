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
    const socket = io('http://localhost:8080', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: Infinity
    } ); //todo change to production.env host

    socket.on('connect', () => {

      socket.emit('main feed connect');

      socket.on('update feeds', feeds => {
        console.log('received updated feeds');
        if (feeds === null) {
          feeds = [];
        }
        console.log('feeds :', Object.values(feeds));
        const feedsArray = Object.values(feeds).map(feed => {
          let parseFeed = JSON.parse(feed);
          return parseFeed;
        })
        this.setState({
          feeds: feedsArray
        })
      });

      socket.on('update deleted feeds', feeds => {
        console.log('received deleted feeds');
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

    socket.on('update feeds', feeds => {
      console.log('received updated feeds');
      if (feeds === null) {
        feeds = [];
      }
      console.log('feeds :', Object.values(feeds));
      const feedsArray = Object.values(feeds).map(feed => {
        let parseFeed = JSON.parse(feed);
        return parseFeed;
      })
      this.setState({
        feeds: feedsArray
      })
    });
    
    socket.on('disconnect', (reason) => {
      console.log('disconnect on feed');
      console.log('reason disconnect on feed:', reason);  
    })  

    // axios
    //   .get('/player/feeds')
    //   .then(feeds => {
    //     let newFeeds = [];
    //     feeds.data.forEach(feed => {
    //       newFeeds.push([feed.host, feed.path]);
    //     });
    //   })
    //   .catch(err => {
    //     console.log('err getting feeds from db');
    //   });
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
            <div className="feed heading popular">
              <Block />

              {this.state.feeds.map((feed, i) => {
                return (
                  <div key={i}>
                    host: {feed.host} path:{feed.path}
                  </div>
                );
              })}
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
