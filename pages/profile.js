import React from 'react';
import Layout from './components/Layout.js';

class profile extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      username: null,
      avatar: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount(){
    const username =  JSON.parse(localStorage.getItem('username'))
    this.setState({ username })
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.setState({
      avatar: URL.createObjectURL(e.target.files[0])
    })
  }

  render() {
    return (
      <Layout>
        <h1>Hi { this.state.username}</h1>
        
        <img src={this.state.avatar}/>
        <form
          action='/users/profile/avatar' 
          method='post' 
          encType='multipart/form-data'>
            <input
              id='avatarFileInput'
              type='file' 
              name='avatar'
              onChange={this.handleFileUpload}
            />
            <button name='Submit'>Submit</button>
          </form>
      </Layout>
    );
  }
}

export default profile;