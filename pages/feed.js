import Layout from './components/Layout.js';
import React from 'react';
import axios from 'axios';
import Block from './components/block';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      done: false
    };
  }

  componentWillMount() {
    this.getFeeds();
  }

  componentDidMount() {
    this.setState({
      done: true
    })
  }

  getFeeds() {
    axios
      .get('/player/feeds')
      .then(feeds => {
        let newFeeds = [];
        feeds.data.forEach(feed => {
          newFeeds.push([feed.host, feed.path]);
        });
      })
      .catch(err => {
        console.log('err getting feeds from db');
      });
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
              <Block />
              <Block />
              <Block />
              <Block />
              <Block />

              {this.state.feeds.map((feed, i) => {
                return (
                  <div key={i}>
                    host: {feed[0]} path:{feed[1]}
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
