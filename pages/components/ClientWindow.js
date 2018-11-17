import React from 'react';
import axios from 'axios';

const clientSrcUrl = '/api/player/client/';

let ClientPlayer = () => <div></div>;
ClientPlayer.loaded = false;

class ClientWindow extends React.Component {
  constructor(props) {
    super(props);
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
      let props = {...this.props};
      if(props.hostingName && !props.sessionHost) {
        props.sessionHost = props.hostingName;
      }
      return (<div>
        {this.state.hasLoaded ? <ClientPlayer {...props} /> : 'Loading...'}
      </div>);
    }
    return <span></span>;
  }
}

ClientWindow.propTypes = {
  hostingName: propTypes.string,
  sessionHost: (props, propName, componentName) => {
    if(props.sessionHost && typeof props.sessionHost !== 'string') {
      return new Error(`Invalid props supplied to ${componentName}: sessionHost must be a string if it is supplied.`);
    } else if (!props.sessionHost && typeof props.hostingName !== 'string') {
      return new Error(`Invalid props supplied to ${componentName}: if sessionHost is not supplied, hostingName must be a string`);
    } else if (props.hostingName && props.hostingName !== props.sessionHost) {
      return new Error(`Invalid props supplied to ${componentName}: sessionHost and hostingName must be identical if both supplied.`)
    }
  },
  isActive: propTypes.bool.isRequired,
  clientComponentProp: propTypes.element,
  resetToLobby: propTypes.function.isRequired,
}

export default ClientWindow;

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
 * hostingName / sessionHost - 
 *    unique identifier of the session to join. hostingName 
 *    will be used as a fallback for nonexistent sessionHost
 * 
 *  clientComponentProp - 
 *    optional passing-down of the player component if we already have it loaded
 *    in a higher element
 */