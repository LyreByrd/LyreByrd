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
          <h1>Loading...</h1>
        </Layout>
      )
    }    
    return (
      <Layout>
      <div class="ui two column centered grid">
        <div class="four column centered row">
          <div class="massive ui buttons">
          <a href={`/player?host=${this.state.user}`}>
            <button class="ui youtube button">
              <i class="youtube icon"></i>
              YouTube
            </button>
          </a>
          <div class="or"></div>
          <a href={`player?host=${this.state.user}&service=spotify`}>
            <button class="ui spotify button">
              <i class="spotify icon"></i>
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