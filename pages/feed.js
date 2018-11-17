import NavBar from './components/NavBar.js';
import react from 'react';
import axios from 'axios';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: []
    }

  }

  componentDidMount() {
    this.getFeeds()
  }

  getFeeds() {
    axios.get('/player/feeds')
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
      <div>
        <header>
          <NavBar />
        </header>
        <h1>Main Feed</h1>
        <div>
          {this.state.feeds.map((feed, i) => {
            return <div key={i}>host: {feed[0]} path:{feed[1]}</div>
          })}
        </div>
      </div>
    )
  }
}

export default Feed;
