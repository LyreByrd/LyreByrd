import Layout from './components/Layout.js';
import React from 'react';
import axios from 'axios';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: []
    }

  }

  componentWillMount() {
    this.getFeeds()
  }

  getFeeds() {
    axios.get('/playerFeeds')
    .then(feeds => {
      let newFeeds = [];
      feeds.data.forEach(feed => {
        newFeeds.push([feed.host, feed.path])
      })
      if (this.state.feeds.length === 0) {
        this.setState({
          feeds: newFeeds
        })
      } else {
        this.setState(prevState => {
          feeds: [...prevState.feeds, ...newFeeds]
        })
      }
    })
    .catch(err => {
      console.log('err getting feeds from db', err)
    })
  }

  render() {
    return (
      <Layout>
        <h1>Main Feed</h1>
        <div>
          {this.state.feeds.map((feed, i) => {
            return <div key={i}>host: {feed[0]} path:{feed[1]}</div>
          })}
        </div>
      </Layout>
    )
  }
}

export default Feed;
