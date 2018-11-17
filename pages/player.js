// import react from 'react';
import NavBar from './components/NavBar.js';
import Chat from './components/chat.js'
import {withRouter} from 'next/router';

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: '',
      path: ''
    }
  }

  componentDidMount() {
    console.log('url query', this.props.url.query)
    let currentHost = this.props.url.query.host;
    this.setState({
      host: currentHost,
      path: `/player?host=${currentHost}`
    })
  }

  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <h1>host: {this.state.host}</h1>
        <Chat 
          user={this.props.user}
          path={this.state.path}
        />
      </div>
    )
  }
}

export default Player;