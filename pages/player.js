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
      host: props.router.query.host,
      //host: this.props.user
      isReady: false,
    }
    this.resetToLobby = this.resetToLobby.bind(this);
  }

  resetToLobby() {
    console.log('Make this do something useful!');
    this.setState({isReady: false}, () => {
      setTimeout(() => this.regenSession(), 5000);
    });
  }

  componentDidMount() {
    console.log('url query', this.props.url.query)
    let currentHost = this.props.url.query.host;
    this.setState({
      host: currentHost,
      path: `/player?host=${currentHost}`
    }, () => {
      if (this.state.host === this.props.user) {
        this.tryClaimHost();
      } else {
        this.setState({isReady: true});
      }
    })
  }

  regenSession() {
    if (this.state.host === this.props.user) { 
      axios.post('/host', {hostingName: this.state.hostingName})
        .then((res) => {
          //console.log('host claim response: ', res);
          if(res.data.hostName === this.state.hostingName) {
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
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <h1>Host is: {this.state.host}</h1>
        {this.state.host === this.props.user ? 
          <HostWindow isActive={this.state.isReady} hostingName={this.state.host} resetToLobby={this.resetToLobby}/> : 
          <ClientWindow isActive={this.state.isReady} sessionHost={this.state.host} resetToLobby={this.resetToLobby}/>
        }
        <Chat 
          user={this.props.user}
          path={this.state.path}
        />
      </div>
    )
  }
}

export default withRouter(Player);