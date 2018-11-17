import React from 'react';
import axios from 'axios';

const clientSrcUrl = '/api/player/client/';

let ClientPlayer = () => <div></div>;
ClientPlayer.loaded = false;

class ClientWindow extends React.Component {
  constructor(props) {
    super(props);
    this.props.sessionHost = this.props.hostingName;
    this.state = {
      hasLoaded: false,
    }
    this.clientComponentReady = this.clientComponentReady.bind(this);
    if (this.props.clientElementProp) {
      ClientPlayer = this.props.clientComponentProp;
    }
  }

  clientComponentReady(newComponent) {
    if (window.hasClientComponent) {
      window.hasClientComponent = () => undefined;
    }
    if(newComponent) {
      ClientPlayer = newComponent;
    }
    this.setState({hasLoaded: true});
  }

  componentDidMount() {
    if(ClientComponent.loaded === false) {
      loadClient = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = clientSrcUrl;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.clientScript = tag;
        window.hasClientComponent = (ClientComponent) => this.clientComponentReady(ClientComponent);
      })
    } else {
      this.clientComponentReady();
    }
  }

  render() {
    if (this.props.isActive) {
      return (<div>
        {this.state.hasLoaded ? <ClientPlayer {...this.props} /> : 'Loading...'}
      </div>);
    }
    return <span></span>;
  }
}

export default ClientWindow;

/* Props:
 * 
 * isActive - 
 *    determines whether it should be visible or a collapsed span
 * 
 * resetToLobby - 
 *    a function to be called in the event of a server error
 *    that requires regeneration of the session
 * 
 * hostingName - 
 *    unique identifier with which to host
 * 
 *  clientComponentProp - 
 *    optional passing-down of the component if we already have it loaded
 *    in a higher element
 */