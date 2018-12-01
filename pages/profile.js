import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';
import FeedBlock from './components/feedBlock';

import Router from 'next/router';
const placeholderData = require('../static/placeholderAvatar.js').default;

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
      done: false,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const spotifyName = localStorage.getItem('spotifyName');
    const spotifyAvtr = localStorage.getItem('spotifyAvtr');
    if (!username) {
      return Router.push('/login');
    }
    this.setState(
      {
        username,
        spotifyName,
        spotifyAvtr,
        done: true,
      },
      () => this.getUserAvatar(),
    );
  }

  //shows preview of avatar
  handleFileUpload(e) {
    let file = e.target.files[0];

    if (!file.type.match(/image.*/)) {
      window.alert('please choose an image file');
      e.target.value = null;
    } else if (file > 500000) {
      window.alert('please select an image file 500 KB or less');
      e.target.value = null;
    } else {
      //resize file
      const reader = new FileReader();
      reader.onload = readerEvent => {
        const img = new Image();
        img.onload = imgEvent => {
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
          const resizedImg = dataUrl.replace(
            /^data:image\/(png|jpg);base64,/,
            '',
          );
          this.setState({
            avatarPreviewURL: dataUrl,
            avatarPreviewFile: resizedImg,
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
          const resizedImgTiny = dataUrlTiny.replace(
            /^data:image\/(png|jpg);base64,/,
            '',
          );

          this.setState({
            avatarTinyUrl: dataUrlTiny,
            avatarTinyFile: resizedImgTiny,
          });
        };
        img.src = readerEvent.target.result;
      };
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
        'content-type': 'multipart/form-data',
      },
    };

    if (this.state.avatar !== null) {
      axios
        .post('/user/profile/avatar/upload', fd, config)
        .then(res => {
          this.getUserAvatar();
        })
        .catch(err => {
          console.log('upload error with err :', err);
        });
    }
  }

  getUserAvatar() {
    axios
      .get('/user/profile/avatar', {
        // responseType: 'arraybuffer',
        params: {
          username: this.state.username,
        },
      })
      .then(res => {
        let data = res.data;
        // console.log('data :', data);
        // let contentType = res.headers['content-type'];
        // let avatarSrc = `data:${contentType};base64,${new Buffer(data).toString('base64')}`;
        this.setState({
          avatarSrc: data,
        });
      })
      .catch(err => {
        console.log('error getting avatar :', err);
      });
  }

  getPlaylist() {
    axios
      .get('/user/getspotify')
      .then(data => {
        console.log(data.data);
        if (data.data.message) {
          alert('hook your spotify account first');
        }
      })
      .catch(err => console.log(err));
  }

  refreshToken() {
    axios
      .post('user/refresh')
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  player() {
    axios
      .post('user/player')
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  popUp(username) {
    popupTools.popup(
      `/auth/spotify?user=${username}`,
      'Spotify Connect',
      {},
      (err, user) => {
        if (err) {
          // alert(err.message);
          console.log(err);
        } else {
          // save the returned user in localStorage/cookie or something
          console.log(user);
          localStorage.setItem('spotifyName', user.displayName);
          localStorage.setItem('spotifyAvtr', user.photo);
          this.setState({
            spotifyName: user.displayName,
            spotifyAvtr: user.photo,
          });
        }
      },
    );
  }

  render() {
    let spotifyRndr;
    console.log(this.state.spotifyName);
    if (!this.state.done) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      );
    } else {
      if (this.state.spotifyName) {
        spotifyRndr = (
          <div>
            <h1>Spotify Name: {this.state.spotifyName}</h1>
            <img src={this.state.spotifyAvtr} width="200" height="200" />
          </div>
        );
      } else {
        spotifyRndr = (
          <div>
            {/* <div>
          <a href={`/auth/spotify?user=${this.state.username}`}>hookup with spotify</a>
        </div> */}
            <button onClick={() => this.popUp(this.state.username)}>
              hook up spotify
            </button>
          </div>
        );
      }
      return (
        <div className="body">
          <Layout>
            <div className="ethan">
              <div className="container">
                <div className="hero">
                  <div className="profile-hero">
                    <div className="avatar">
                      <img
                        className="avatar-img"
                        src={this.state.avatarSrc}
                        width="200"
                        height="200"
                      />
                      <div className="icon-position">
                        <div className="camera">
                          <label htmlFor="file">
                            <img
                              className="camera-svg"
                              src="../static/icons/_ionicons_svg_md-camera.svg"
                              alt="upload image"
                            />
                          </label>
                          <input
                            id="file"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={this.handleFileUpload}
                          />
                          <button name="Submit" onClick={this.handleFileSubmit}>
                            Submit
                          </button>
                        </div>
                      </div>
                      <div />
                    </div>
                    <div className="profile-name">{this.state.username}</div>
                  </div>
                </div>
                <div className="links">
                  <div className="feed-links">
                    <a className="btn playlist" onClick={this.getPlaylist}>
                      playlists
                    </a>
                    <a className="btn token" onClick={this.refreshToken}>
                      Token
                    </a>
                    <a className="btn player" onClick={this.player}>
                      player
                    </a>
                  </div>
                </div>

                <div>
                  {/* <a href={`/auth/youtube?user=${this.state.username}`}>hookup with youtube</a> */}
                  <a href={`/auth/spotify?user=${this.state.username}`}>
                    hookup with spotify
                  </a>
                </div>
              </div>
              <div className="profile-feed">
                <div className="main">
                  <FeedBlock />
                  <FeedBlock />
                </div>
                <div className="sidebar">Sidebar</div>
              </div>
            </div>
          </Layout>
          <style jsx>{`
            .body {
              font-size: 62.5%;
            }
            .ethan {
              display: grid;
              grid-template-rows: 400px, 100px, 400px;
              background-color: #dfdcd4;
            }
            .container {
              display: grid;
              grid-template-rows: repeat(auto-fill, minmax(14rem, 1fr));
              grid-template-columns: auto;
              background-color: white;
              margin: 0 100px 0 100px;
            }

            .hero {
              background: linear-gradient(#243b55, #141e30);
              grid-row-start: 1;
              position: relative;
              overflow: hidden;
              padding: 3rem;
              width: 100%;
            }

            .profile-hero {
              display: grid;
              grid-template-columns: auto 1fr;
              grid-gap: 1rem;
              height: 100%;
              width: 100%;
              margin: 0 auto;
              overflow: hidden;
            }

            .avatar {
              grid-column-start: 1;
              display: block;
              position: relative;
            }

            .icon-position {
              width: -20%;
              height: 20%;
              position: absolute;
              right: 0;
              top: 0;
              padding: 2px 5px 0 0;
            }

            .camera {
              grid-column-start: 1;
              float: right;
              width: 20px;
              height: 20px;
              text-decoration: none;
              color: red;
              cursor: pointer;
            }

            .camera > input {
              display: none;
            }
            .camera:hover {
              opacity: 0.3;
            }

            .camera-svg {
              color: red;
            }

            .profile-name {
              grid-column-start: 2;
              color: #eee;
              height: 10rem;
              width: 100%;
              font-size: 2.4rem;
              font-weight: 10rem;
              line-height: 3.7rem;
              text-transform: uppercase;
              letter-spacing: 0.1rem;
            }

            .links {
              grid-row-start: 2;
              position: relative;
              height: 3.2rem;
              margin: 0 1rem 0 1rem;
              line-height: 3.2rem;
              border-bottom: 0.1rem solid #dfdcd4;
              padding-bottom: 0.5px;
            }

            .feed-links {
              display: grid;
              grid-template-columns: 8rem 6rem 6rem;
            }

            .player {
              grid-column-start: 3;
            }

            .btn {
              text-transform: uppercase;
              vertical-align: bottom;
              color: black;
              font-size: 1.125rem;
              height: 3.2rem;
              text-align: left;
              letter-spacing: 2px;
            }

            .btn:hover {
              color: red;
              border-bottom: 1px solid red;
            }

            .profile-feed {
              display: grid;
              grid-template-columns: 1fr 40rem;
              grid-row-start: 3;
              margin: 0 100px 0 100px;
            }

            .main {
              grid-column-start: 1;
              background-color: white;
              border-right: 1px solid #dfdcd4;
              padding-right: 0.5rem;
            }

            .sidebar {
              grid-column-start: 2;
              background-color: white;
            }
          `}</style>
        </div>
      );
    }
  }
}
export default profile;
