import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
// import { read } from 'fs';
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
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount(){
    const username =  JSON.parse(localStorage.getItem('username'))
    this.setState({
      username
    }, () => this.getUserAvatar())
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

  render() {
    return (
      <Layout>
        <h1>Hi { this.state.username}</h1>
        <img src={this.state.avatarSrc} width='200' height='200'></img>
        <div>
          <img src={this.state.avatarPreviewURL} />
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
        <div>Max File Size: 500 KB</div>
        <button onClick={this.sendCookie}>lcik spotify</button>
        <button onClick={this.refreshToken}>Refresh Token</button>
      </Layout>
    );
  }
}

export default profile;