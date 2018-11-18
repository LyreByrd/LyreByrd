// import react from 'react';
import NavBar from './components/NavBar.js';
import react from 'react';
import {withRouter} from 'next/router';
import HostWindow from './components/HostWindow.js';
import ClientWindow from './components/ClientWindow.js';
import axios from 'axios';
import Chat from './components/chat.js'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      host: props.router.query.host,
      //host: this.props.user
      isReady: false,
      initialMountDone: false,
    }
    this.resetToLobby = this.resetToLobby.bind(this);
  }

  resetToLobby(error) {
    console.log('error in lobby reset', error)
    console.log('Make this do something useful!');
    this.setState({isReady: false}, () => {
      setTimeout(() => this.regenSession(), 5000);
    });
  }

  componentDidMount() {
    console.log('url query', this.props.url.query)
    let currentHost = this.props.url.query.host;
    let currentUser = JSON.parse(localStorage.getItem('username'));
    this.setState({
      // host: currentHost,
      user: currentUser,
      path: `/player?host=${currentHost}`,
      initialMountDone: true,
    }, () => {
      console.log(this.state.host, 'host')
      console.log(this.state.user, 'user')
      if (this.state.host === this.state.user) {
        this.tryClaimHost();
      } else {
        this.setState({isReady: true});
      }
    })
  }

  regenSession() {
    if (this.state.host === this.props.user) { 
      axios.post('api/player/create', {
        host: this.state.user,
        path: `/player?host=${this.state.user}`
      })
      //axios.post('/host', {hostingName: this.state.hostingName})
        .then((res) => {
          //console.log('host claim response: ', res);
          if(true) {
            this.setState({isReady: true});
          }
        })
        .catch((err) => {
          if(err.response.status === 403) {
            alert('Host claimed or in dispute');
          } else {
            console.error(err);
          }
        });
    } else {
      this.setState({isReady: true})
    }
  }

  tryClaimHost() {
    //maybe host definitely has been created once we navigate here?
    this.setState({isReady: true});
    // axios.post('/host', {hostingName: this.state.hostingName})
    // .then((res) => {
    //   //console.log('host claim response: ', res);
    //   if(res.data.hostName === this.state.hostingName) {
    //     this.setState({inSession: true, isHost: true});
    //   }
    // })
    // .catch((err) => {
    //   if(err.response.status === 403) {
    //     alert('Host claimed or in dispute');
    //   } else {
    //     console.error(err);
    //   }
    // });
  }

  render() {
    let playerElement;
    if (this.state.initialMountDone) {
      playerElement = this.state.host === this.state.user ? 
        <HostWindow isActive={this.state.isReady} hostingName={this.state.host} resetToLobby={this.resetToLobby}/> : 
        <ClientWindow isActive={this.state.isReady} sessionHost={this.state.host} resetToLobby={this.resetToLobby}/>
    } else {
      playerElement = <span></span>
    }
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <h1>Host is: {this.state.host}</h1>
        {playerElement}
        <Chat 
          user={this.props.user}
          path={this.state.path}
        />
      </div>
    )
  }
}

export default withRouter(Player);