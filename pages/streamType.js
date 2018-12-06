import React from  'react';
import Layout from './components/Layout';
import Router from 'next/router';



class streamType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      done: false
    }
  }

  componentDidMount() {
    let user = localStorage.getItem('username')
    this.setState({
      user,
      done: true
    });
  }
  
  render() {

    if (!this.state.done) {
      return (
        <Layout>
            <div className="ui active inverted dimmer">
              <div className="ui massive text loader">Loading</div>
            </div>
        </Layout>
      )
    }    
    return (
      <Layout>
        <div className="ui two column centered grid">
          <div className="four column centered row">
            <div className="massive ui buttons">
            <a href={`/player?host=${this.state.user}&service=youtube`}>
              <button className="ui youtube button">
                <i className="youtube icon"></i>
                YouTube
              </button>
            </a>
            <div className="or"></div>
            <a href={`player?host=${this.state.user}&service=spotify`}>
              <button className="ui spotify button">
                <i className="spotify icon"></i>
                Spotify
              </button>
            </a>
            </div>
          </div>
        </div>
      </Layout>

    )
  }
} 



export default streamType