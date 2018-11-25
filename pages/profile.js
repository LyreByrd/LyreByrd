import React from 'react';
import Layout from './components/Layout.js';

class profile extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      username: null
    };
  }

  componentDidMount(){
    const username =  JSON.parse(localStorage.getItem('username'))
    this.setState({ username })
  }

  render() {
    return (
      <Layout>
        <h1>Hi { this.state.username}</h1>
      </Layout>
    );
  }
}

export default profile;