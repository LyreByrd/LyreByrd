import React from 'react';
import Layout from './components/Layout.js';
import axios from 'axios';
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

class profile extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      username: null,
      avatar: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount(){
    const username =  JSON.parse(localStorage.getItem('username'))
    this.setState({ username })
  }

  handleFileUpload(e) {
    // e.preventDefault();
    console.log(e.target.files[0].size <= 150000);
    if (e.target.files[0].size <= 150000) {
      this.setState({
        avatar: URL.createObjectURL(e.target.files[0])
      })
    } else {
      window.alert('please select a file 150 KB or less');
      e.target.value = null;
    }
  }

  handleFileSubmit() {
    if (this.state.avatar !== null) {
      

      // axios.post('/user/profile/avatar', data)
      // .then(res => {
      //   console.log('upload success with res :', res);
      // })
      // .catch(err => {
      //   console.log('upload error with err :', err);
      // })
    }
  }

  render() {
    return (
      <Layout>
        <h1>Hi { this.state.username}</h1>
        <div>
          <img src={this.state.avatar}/>
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
      </Layout>
    );
  }
}

export default profile;