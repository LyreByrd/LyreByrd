import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';

class profile extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      username: null,
      avatarURL: null,
      avatarFile: null,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount(){
    const username =  JSON.parse(localStorage.getItem('username'))
    this.setState({ username })
  }

  //shows preview of avatar
  handleFileUpload(e) {
    // e.preventDefault();
    if (e.target.files[0].size <= 150000) {
      this.setState({
        avatarURL: URL.createObjectURL(e.target.files[0]),
        avatarFile: new File([e.target.files[0]], `${this.state.username}_avatar.jpg`, {type: 'image/jpg'})
      })
    } else {
      window.alert('please select a file 150 KB or less');
      e.target.value = null;
    }
  }

  //posts avatar to db
  handleFileSubmit() {
    // console.log('this.state.avatarFile :', this.state.avatarFile);
    // console.log('this.state.avatarURL :', this.state.avatarURL);

    let fd = new FormData();
    
    fd.append('avatarFile', this.state.avatarFile);
    fd.append('username', `${this.state.username}`);

    // console.log('formData :', Array.from(fd.entries()));

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (this.state.avatar !== null) {
      axios.post('/user/profile/avatar/upload', fd, config)
      .then(res => {
        console.log('upload success with res :', res);
      })
      .catch(err => {
        console.log('upload error with err :', err);
      })
    }
  }

  getUserAvatar() {
    axios.get('/user/profile/avatar')
    .then(avatarImg => {

    })
  }

  sendCookie() {
    axios.get('/user/getspotify')
    .then((data)=> console.log(data))
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
    return (
      <Layout>
        <h1>Hi { this.state.username}</h1>
        <div>
          <img src={this.state.avatarURL} width='300' height='300'/>
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
        <button onClick={this.sendCookie}>lcik spotify</button>
        <button onClick={this.refreshToken}>Refresh Token</button>
        <button onClick={this.player}>player</button>
      </Layout>
    );
  }
}

export default profile;