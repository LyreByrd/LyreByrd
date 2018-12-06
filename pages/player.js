import Layout from './components/Layout.js';
import React from 'react';
import { withRouter } from 'next/router';
import HostWindow from './components/HostWindow.js';
import ClientWindow from './components/ClientWindow.js';
import axios from 'axios';
import Chat from './components/chat.js';
import io from 'socket.io-client';
let config = require('./config/config.js')

const playerContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexBasis: 'auto',
  justifyContent: 'space-around',
}

const chatStyle = {
  'marginBottom': 'auto'
}
const contentStyle = {
  'marginBottom': 'auto',
  color : 'white',
  'backgroundColor': 'rgb(27, 26, 26)',
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      host: props.router.query.host,
      service: props.router.query.service,
      isReady: false,
      initialMountDone: false,
      usersInRoom: 0,
      hostTimestamp: null,
    }
    this.resetToLobby = this.resetToLobby.bind(this);
  }

  resetToLobby(error) {
    console.log('error in lobby reset', error);
    console.log('Make this do something useful!');
    this.setState({ isReady: false }, () => {
      setTimeout(() => this.regenSession(), 5000);
    });
  }

  getInitialProps() {}

  componentDidMount() {
    let currentHost = this.props.router.query.host;
    let currentUser = localStorage.getItem('username');
    this.setState(
      {
        // host: currentHost,
        user: currentUser,
        path: `/player?host=${currentHost}&service=${this.state.service}`,
        initialMountDone: true,
      },
      () => {
        if (this.state.host === this.state.user) {
          this.tryClaimHost();

          //sends a new host feed object through socket to feed server
          this.socketFeed();

          //sends a new host feed object through socket to feed server
          this.socketFeed();
        } else {
          this.setState({ isReady: true });
        }
      },
    );
  }

  regenSession() {
    // console.log('checking to see if user should be host');
    //console.log('this.state.host :', this.state.host);
    //console.log('this.state.user :', this.state.user);
    if (this.state.host === this.state.user) {
      // console.log('attempting to recreate sync session');
      axios
        .post('api/player/create', {
          host: this.state.user,
          path: `/player?host=${this.state.user}`,
          service: this.state.service,
        })
        //axios.post('/host', {hostingName: this.state.hostingName})
        .then(res => {
          //console.log('host claim response: ', res);
          let newState = {isReady: true}
          //console.log(res.data.sync);
          if (res.data && res.data.sync) {
            newState.hostTimestamp = res.data.sync.hostTimestamp;
          }
          if(true) {
            this.setState(newState);
          }
        })
        .catch((err) => {
          console.log(err)
          //if(err.response.status === 403) {
          //  alert('Host claimed or in dispute');
          //} else {
            console.error(err);
          //}
        });
    } else {
      this.setState({ isReady: true });
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
    const socket = io(`${config.PROXY_IP}:8080`, {secure: true}); 
    const feedData = {
      host: this.state.user,
      path: this.state.path,
      usersInRoom: this.state.usersInRoom,
      service: this.state.service,
    };

    socket.on('connect', () => {
      socket.emit('new feed', feedData);
      socket.emit('join player');
    });
  }

  render() {
    let playerElement;
    if (this.state.initialMountDone) {
      playerElement = this.state.host === this.state.user ? 
        <HostWindow hostTimestamp ={this.state.hostTimestamp} isActive={this.state.isReady} hostingName={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service}/> : 
        <ClientWindow isActive={this.state.isReady} sessionHost={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service} user={this.state.user}/>
    } else {
      playerElement = <span id="lak">Loading...</span>;
    }
    return (
      <Layout>
        <div className='player-container' style={playerContainer}>
          <div className='content-container' style={contentStyle}>
            {playerElement}
          </div>
          <div className='chat-container' style={chatStyle}>
          <Chat
            user={this.props.user}
            path={this.state.path}
            host={this.state.host}
          />
          </div>
          <style jsx>{``}</style>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Player);
