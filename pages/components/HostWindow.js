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
    if (this.props.hostComponentProp) {
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
    if(HostPlayer.loaded === false) {
      let loadHost = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = hostSrcUrl + this.props.service;
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
      return (<div style={{padding: '1em'}}>
        {this.state.hasLoaded ? <HostPlayer {...this.props} /> : 'Loading...'}
      </div>);
    }
    return <span></span>;
  }
}

// HostWindow.propTypes = {
//   hostingName: propTypes.string.isRequired,
//   isActive: propTypes.bool.isRequired,
//   hostComponentProp: propTypes.element,
//   resetToLobby: propTypes.function.isRequired,
// }

export default HostWindow;

/* Props:
 * 
 * isActive - 
 *    determines whether it should be visible or a collapsed span
 *    (useful for loading the script early)
 * 
 * resetToLobby - 
 *    a function to be called in the event of a server error
 *    that requires regeneration of the session
 * 
 * hostingName - 
 *    unique identifier with which to define hosted session
 * 
 *  hostComponentProp - 
 *    optional passing-down of the player component if we already 
 *    have it loaded in a higher element
 */