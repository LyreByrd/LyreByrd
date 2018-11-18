import Layout from './components/Layout.js';
import react from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: this.props.user
    }
  }

  componentDidMount() {
    let currentHost = localStorage.getItem('username');
    this.setState({
      host: currentHost
    })
  }

  render() {
    return (
      <Layout>
        <h1>Host is: {this.state.host}</h1>
      </Layout>
    )
  }
}

export default Player;