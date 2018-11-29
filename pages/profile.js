import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
import FormData from 'form-data';

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      avatarSrc: null,
      avatarPreviewURL: null,
      avatarPreviewFile: null,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    this.setState(
      {
        username,
      },
      () => this.getUserAvatar(),
    );
  }

  //shows preview of avatar
  handleFileUpload(e) {
    if (e.target.files[0].size <= 500000) {
      this.setState({
        avatarPreviewURL: URL.createObjectURL(e.target.files[0]),
        avatarPreviewFile: new File(
          [e.target.files[0]],
          `${this.state.username}_avatar.jpg`,
          { type: 'image/jpg' },
        ),
      });
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
        responseType: 'arraybuffer',
        params: {
          username: this.state.username,
        },
      })
      .then(res => {
        let data = res.data;
        let contentType = res.headers['content-type'];
        let avatarSrc = `data:${contentType};base64,${new Buffer(data).toString(
          'base64',
        )}`;

        this.setState({
          avatarSrc: avatarSrc,
        });
      })
      .catch(err => {
        console.log('error getting avatar :', err);
      });
  }

  sendCookie() {
    axios
      .get('/user/getspotify')
      .then(data => console.log(data))
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

  render() {
    return (
      <div className="body">
        <Layout>
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
                  <div>
                    <img
                      src={this.state.avatarPreviewURL}
                      width="300"
                      height="300"
                    />
                  </div>
                </div>

                <div className="profile-name">{this.state.username}</div>
              </div>
            </div>
            {/* <input
              id="avatarFileInput"
              type="file"
              name="avatar"
              onChange={this.handleFileUpload}
            />
            <button name="Submit" onClick={this.handleFileSubmit}>
              Submit
            </button>
            <div>Max File Size: 150 KB</div>
            <button onClick={this.sendCookie}>lcik spotify</button>
            <button onClick={this.refreshToken}>Refresh Token</button>
            <button onClick={this.player}>player</button> */}
            <div className="profile-feed">
              <div className="main">Main</div>
              <div className="sidebar">Sidebar</div>
            </div>
          </div>
        </Layout>
        <style jsx>{`
          .body {
            font-size: 62.5%;
          }

          .container {
            display: grid;
            grid-template-rows: repeat(auto-fill, minmax(25rem, 1fr));
            background-color: white;
            margin: 0 100px 0 100px;
            height: 80rem;
          }

          .hero {
            grid-row-start: 1;
            background: linear-gradient(#243b55, #141e30);
            position: relative;
            overflow: hidden;
            padding: 3rem;
            width: 100%;
          }

          .profile-hero {
            display: grid;
            grid-template-columns: 20rem auto;
            grid-gap: 1rem;
            height: 20rem;
             {
              /* padding: 3rem 3rem 3rem 20rem; */
            }
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
          }

          .avatar {
            grid-column-start: 1;
            vertical-align: ;
            height: 100%;
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
          .profile-feed {
            display: grid;
            grid-template-columns: 1fr 40rem;
          }

          .main {
            grid-column-start: 1;
            background-color: lightblue;
          }

          .sidebar {
            grid-column-start: 2;
            background-color: lightgreen;
          }
        `}</style>
      </div>
    );
  }
}

export default profile;
