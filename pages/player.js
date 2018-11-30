import Layout from './components/Layout.js';
import react from 'react';
import {withRouter} from 'next/router';
import HostWindow from './components/HostWindow.js';
import ClientWindow from './components/ClientWindow.js';
import axios from 'axios';
import Chat from './components/chat.js'

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
      service: props.router.query.service || 'youtube',
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
    let currentHost = this.props.url.query.host;
    let currentUser = localStorage.getItem('username');
    this.setState({
      // host: currentHost,
      user: currentUser,
      path: `/player?host=${currentHost}`,
      initialMountDone: true,
    }, () => {
      if (this.state.host === this.state.user) {
        this.tryClaimHost();
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

  render() {
    let playerElement;
    if (this.state.initialMountDone) {
      playerElement = this.state.host === this.state.user ? 
        <HostWindow isActive={this.state.isReady} hostingName={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service}/> : 
        <ClientWindow isActive={this.state.isReady} sessionHost={this.state.host} resetToLobby={this.resetToLobby} service={this.state.service}/>
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
