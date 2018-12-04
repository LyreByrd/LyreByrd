import Layout from './components/Layout.js';
import react from 'react';
import {withRouter} from 'next/router';
import HostWindow from './components/HostWindow.js';
import ClientWindow from './components/ClientWindow.js';
import axios from 'axios';
import Chat from './components/chat.js'
import io from 'socket.io-client';
let config = require('./config/config.js')

const playerContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexBasis: 'auto',
  justifyContent: 'space-around',
  alignItems: 'center',
}
class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      host: props.router.query.host,
      //host: this.props.user
      service: props.router.query.service,
      isReady: false,
      initialMountDone: false,
      usersInRoom: 0,
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

  getInitialProps() {

  }

  componentDidMount() {
    let currentHost = this.props.router.query.host;
    let currentUser = localStorage.getItem('username');
    console.log('service :', this.state.service);
    this.setState({
      // host: currentHost,
      user: currentUser,
      path: `/player?host=${currentHost}&service=${this.state.service}`,
      initialMountDone: true,
    }, () => {
      if (this.state.host === this.state.user) {
        this.tryClaimHost();

        //sends a new host feed object through socket to feed server
        this.socketFeed();

      } else {
        this.setState({isReady: true});
      }
    })
  }

  regenSession() {
    // console.log('checking to see if user should be host');
    //console.log('this.state.host :', this.state.host);
    //console.log('this.state.user :', this.state.user);
    if (this.state.host === this.state.user) { 
      // console.log('attempting to recreate sync session');
      axios.post('api/player/create', {
        host: this.state.user,
        path: `/player?host=${this.state.user}`,
        service: this.state.service,
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
    //let token = localStorage.getItem('jwt');
    //console.log('JWT: ', token);
    //maybe host definitely has been created once we navigate here?
    //console.log('trying to claim with state: ', this.state);
    this.regenSession();
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

  socketFeed() {
    const socket = io(`${config.PROXY_IP}:8080`, {secure: true}); //todo change to production.env host
    
    const feedData = {
      host: this.state.user,
      path: this.state.path,
      usersInRoom: this.state.usersInRoom,
      service: this.state.service,
    }

    socket.on('connect', () => {
      socket.emit('new feed', feedData)
      socket.emit('join player');
    })

    
  }

  render() {
    let playerElement;
    if (this.state.initialMountDone) {
      playerElement = this.state.host === this.state.user ? 
        <HostWindow isActive={this.state.isReady} hostingName={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service}/> : 
        <ClientWindow isActive={this.state.isReady} sessionHost={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service} user={this.state.user}/>
    } else {
      playerElement = <span>Loading...</span>
    }
    return (
      <Layout>
        <div style={playerContainer}>
          {playerElement}
          <Chat 
            user={this.props.user}
            path={this.state.path}
            host={this.state.host}
          />

        </div>
      </Layout>
    )
  }
}

export default withRouter(Player);
