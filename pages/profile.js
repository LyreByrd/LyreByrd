import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
import Router from 'next/router';
import popupTools from 'popup-tools';

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      avatarSrc: null,
      avatarPreviewURL: null,
      avatarPreviewFile: null,
      avatarTinyUrl: null,
      avatarTinyFile: null,
      spotifyName: null,
      spotifyAvtr: null,
      done: false
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }


  componentDidMount(){
    const username =  localStorage.getItem('username');
    const spotifyName = localStorage.getItem('spotifyName')
    const spotifyAvtr = localStorage.getItem('spotifyAvtr')
    if (!username) {
      return Router.push('/login');
    }
    this.setState({
      username,
      spotifyName,
      spotifyAvtr,
      done: true
    }, () => this.getUserAvatar());
  }
  

  //shows preview of avatar
  handleFileUpload(e) {

    let file = e.target.files[0];

    console.log('file.size :', file.size);


    if (!file.type.match(/image.*/)) {
      window.alert('please choose an image file');
      e.target.value = null;
    } else if (file > 500000) {
      window.alert('please select an image file 500 KB or less');
      e.target.value = null;
    } else {

      //resize file
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = (imgEvent) => {
          let canvas = document.createElement('canvas');
          let maxSize = 400;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          const resizedImg = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
          
          this.setState({
            avatarPreviewURL: dataUrl,
            avatarPreviewFile: resizedImg
          });


          canvas = document.createElement('canvas');
          let tinySize = 100;
          let tinyWidth = img.width;
          let tinyHeight = img.height;
          if (tinyWidth > tinyHeight) {
            if (tinyWidth > tinySize) {
              tinyHeight *= tinySize / tinyWidth;
              tinyWidth = tinySize;
            }
          } else {
            if (tinyHeight > tinySize) {
              tinyWidth *= tinySize / tinyHeight;
              tinyHeight = tinySize;
            }
          }
          canvas.width = tinyWidth;
          canvas.height = tinyHeight;
          canvas.getContext('2d').drawImage(img, 0, 0, tinyWidth, tinyHeight);
          const dataUrlTiny = canvas.toDataURL('image/jpeg');
          const resizedImgTiny = dataUrlTiny.replace(/^data:image\/(png|jpg);base64,/, "");
          
          this.setState({
            avatarTinyUrl: dataUrlTiny,
            avatarTinyFile: resizedImgTiny
          });
        }
        img.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  //posts avatar to db
  handleFileSubmit() {

    // console.log('this.state.avatyarPreviewFile.length :', this.state.avatarPreviewFile);
    // console.log('this.state.avatarTinyFile.length :', this.state.avatarTinyFile);

    let fd = new FormData();
    fd.append('avatarFile', this.state.avatarPreviewFile);
    fd.append('avatarTinyFile', this.state.avatarTinyFile);
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
      // responseType: 'arraybuffer',
      params: {
        username: this.state.username 
      }
    })
    .then(res => {
      let data = res.data
      // console.log('data :', data);
      // let contentType = res.headers['content-type'];
      // let avatarSrc = `data:${contentType};base64,${new Buffer(data).toString('base64')}`;
      
      this.setState({
        avatarSrc: data
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

  popUp (username) {
    popupTools.popup(`/auth/spotify?user=${username}`, "Spotify Connect", {},
    (err, user) => {
      if (err) {
          // alert(err.message);
          console.log(err)
      } else {
          // save the returned user in localStorage/cookie or something
        console.log(user)
        localStorage.setItem('spotifyName', user.displayName)
        localStorage.setItem('spotifyAvtr', user.photo)
        this.setState({
          spotifyName: user.displayName,
          spotifyAvtr: user.photo,
        })
      }
    })
  }



  render() {
    let spotifyRndr;
    console.log(this.state.spotifyName)
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      )
    } else {
      if (this.state.spotifyName) {
        spotifyRndr = (
          <div>
            <h1>Spotify Name: {this.state.spotifyName}</h1>
            <img src={this.state.spotifyAvtr} width='200' height='200'></img>
          </div>
        )
      } else {
        spotifyRndr = 
        <div>
        {/* <div>
          <a href={`/auth/spotify?user=${this.state.username}`}>hookup with spotify</a>
        </div> */}
        <button onClick={()=>this.popUp(this.state.username)}> 
        hook up spotify
        </button>
        </div>
      }
      return (
        <Layout>
          <h1>Hi { this.state.username}</h1>
          <img src={this.state.avatarSrc} width='200' height='200'></img>
          <div>
            <img src={this.state.avatarPreviewURL} width='300' height='300'/>
            <img src={this.state.avatarTinyUrl} width='50'/>
          </div>
          <input
            id='avatarFileInput'
            type='file' 
            name='avatar'
            accept = 'image/*'
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
            {spotifyRndr}
          </div>
        </Layout>
      );
    }
  }
}

export default profile;