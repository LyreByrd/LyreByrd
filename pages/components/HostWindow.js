import React from 'react';
import axios from 'axios';

const hostSrcUrl = '/api/player/host/';

let HostPlayer = () => <div></div>;
HostPlayer.loaded = false;

class HostWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
    }
    this.hostComponentReady = this.hostComponentReady.bind(this);
    if (this.props.hostElementProp) {
      HostPlayer = this.props.hostComponentProp;
    }
  }

  hostComponentReady(newComponent) {
    if (window.hasHostComponent) {
      window.hasHostComponent = () => undefined;
    }
    if(newComponent) {
      HostPlayer = newComponent;
    }
    this.setState({hasLoaded: true});
  }

  componentDidMount() {
    if(HostComponent.loaded === false) {
      loadHost = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = hostSrcUrl;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.hostScript = tag;
        window.hasHostComponent = (HostComponent) => this.hostComponentReady(HostComponent);
      })
    } else {
      this.hostComponentReady();
    }
  }

  render() {
    if (this.props.isActive) {
      return (<div>
        {this.state.hasLoaded ? <HostPlayer {...this.props} /> : 'Loading...'}
      </div>);
    }
    return <span></span>;
  }
}

export default HostWindow;

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
 *  hostComponentProp - 
 *    optional passing-down of the component if we already have it loaded
 *    in a higher element
 */