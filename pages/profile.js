import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
import Router from 'next/router';

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      avatarSrc: null,
      avatarPreviewURL: null,
      avatarPreviewFile: null,
      done: false
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }


  componentDidMount(){
    const username =  localStorage.getItem('username');
    if (!username) {
      return Router.push('/login');
    }
    this.setState({
      username,
      done: true
    }, () => this.getUserAvatar());

  }
  

  //shows preview of avatar
  handleFileUpload(e) {
    if (e.target.files[0].size <= 500000) {
      this.setState({
        avatarPreviewURL: URL.createObjectURL(e.target.files[0]),
        avatarPreviewFile: new File([e.target.files[0]], `${this.state.username}_avatar.jpg`, {type: 'image/jpg'})
      })
    } else {
      window.alert('please select an image file 500 KB or less');
      e.target.value = null;
    }
  }

  //posts avatar to db
  handleFileSubmit() {
    
    let fd = new FormData();
    fd.append('avatarFile', this.state.avatarPreviewFile);
    fd.append('username', `${this.state.username}`);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (this.state.avatar !== null) {
      axios.post('/user/profile/avatar/upload', fd, config)
      .then(res => {
        this.getUserAvatar();
      })
      .catch(err => {
        console.log('upload error with err :', err);
      })
    }
  }

  getUserAvatar() {
    axios.get('/user/profile/avatar', {
      responseType: 'arraybuffer',
      params: {
        username: this.state.username 
      }
    })
    .then(res => {
      let data = res.data
      let contentType = res.headers['content-type'];
      let avatarSrc = `data:${contentType};base64,${new Buffer(data).toString('base64')}`;
      
      this.setState({
        avatarSrc: avatarSrc
      })
    })
    .catch(err => {
      console.log('error getting avatar :', err);
    })
  }

  getPlaylist() {
    axios.get('/user/getspotify')
    .then(data => {
      console.log(data.data)
      if (data.data.message) {
        alert('hook your spotify account first');
      }
    })
    .catch(err => console.log(err));
  }

  refreshToken() {
    axios.post('user/refresh')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  player() {
    axios.post('user/player')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }


  render() {
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>Hi { this.state.username}</h1>
          <img src={this.state.avatarSrc} width='200' height='200'></img>
          <div>
            <img src={this.state.avatarPreviewURL} width='300' height='300'/>
          </div>
          <input
            id='avatarFileInput'
            type='file' 
            name='avatar'
            onChange={this.handleFileUpload}
          />
          <button 
            name='Submit'
            onClick={this.handleFileSubmit}
          >Submit</button>
          <div>Max File Size: 150 KB</div>
            <button onClick={this.getPlaylist}>get your playlists</button>
            <button onClick={this.refreshToken}>Refresh Token</button>
            <button onClick={this.player}>player</button>
          <div>
            {/* <a href={`/auth/youtube?user=${this.state.username}`}>hookup with youtube</a> */}
            <div>
              <a href={`/auth/spotify?user=${this.state.username}`}>hookup with spotify</a>
            </div>
          </div>
        </Layout>
      );
    }
  }
}

export default profile;