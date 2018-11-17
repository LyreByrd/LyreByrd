import NavBar from './components/NavBar.js';
import React from 'react';
import axios from 'axios';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      list: null,
    };
    // this.callYT = this.callYT.bind(this);
  }

  componentWillMount(){
    axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=PLoh4MB-kbBmI-Ma1hhP3cth9hqqHRqoFZ&key=AIzaSyB_PRUH-XrUm5qNJC7frwt6LDXzJyIJMRE')
    .then((response) => {
      // return data.json().then((data) => {
        console.log(response.data.items[0]);
        this.setState({
          current: response.data.items[0],
          list: response.data.items
        });
      // });
    });
  }

  handleClick(video) {
    this.setState({ current : video } )
  }


  render(){

    if (!this.state.list) {
      return (
        <div>
          <header>
            <NavBar />
          </header>
            <h1>Main Feed</h1>
            {/* <button onClick={this.callYT}>youtube</button> */}
        </div>
      )
    }
    
    return (
    <div>
      <header>
        <NavBar />
      </header>
        <h1>Main Feed</h1>
        <div className="video-player">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.state.current.id.videoId}`} allowFullScreen></iframe>
          </div>
          <div className="video-player-details">
            <h3>{this.state.current.snippet.title}</h3>
            <div>{this.state.current.snippet.description}</div>
          </div>
        </div>
        {this.state.list.map((videoPassed, i) =>
          <div key={i} className="video-list-entry media">
            <div className="media-left media-middle" onClick={() => this.handleClick(videoPassed)}>
              <img className="media-object" src={videoPassed.snippet.thumbnails.default.url} alt="" />
            </div>
            <div className="media-body">
              <div className="video-list-entry-title" onClick={() => this.handleClick(videoPassed)}>{videoPassed.snippet.title}</div>
              <div className="video-list-entry-detail">{videoPassed.snippet.description}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Feed;
