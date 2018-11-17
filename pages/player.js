import NavBar from './components/NavBar.js';
import react from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: this.props.user
    }
  }

  componentDidMount() {
    let currentHost = JSON.parse(localStorage.getItem('username'));
    this.setState({
      host: currentHost
    })
  }

  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <h1>Host is: {this.state.host}</h1>
      </div>
    )
  }
}

export default Player;