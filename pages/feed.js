import NavBar from './components/NavBar.js';
import React from 'react';
import axios from 'axios';
import Block from './components/block';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
    };
  }

  componentDidMount() {
    this.getFeeds();
  }

  getFeeds() {
    axios.get('/player/feeds')
    .then(feeds => {
      let newFeeds = [];
      feeds.data.forEach(feed => {
        newFeeds.push([feed.host, feed.path])
      })
      .catch(err => {
        console.log('err getting feeds from db', err);
      });
  }

  render() {
    return (
      <div className="body">
        <header>
          <NavBar />
        </header>
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
        <style jsx>{`
          .body {
            background-color: #dfdcd4;
          }

          .container {
            display: grid;
            grid-template-columns: 8fr 2fr;
            background-color: white;
            height: 2000.75px;
            margin: 0 100px;
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
