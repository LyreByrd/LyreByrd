import react from 'react';
import io from 'socket.io-client';
import moment from 'moment';
let config = require('../config/config.js');


const msgStyle = {
  width: '380px'
}
class CreateMessage extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAvatar: this.props.user.userAvatar,
      newMessage: {
        user: this.props.user.username,
        message: '',
        room: this.props.host,
        timeStamp: '12:00 am',
      },
    };
  }

  submitMessage = e => {
    e.preventDefault();
    const socket = io(`${config.PROXY_IP}:8000`, { secure: true });
    const now = moment();
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: this.state.message,
        room: this.props.host,
        timeStamp: now,
      },
    });
    socket.emit('chat message', this.state.newMessage);
    let messageAvatarObject = {
      user: this.props.user.username,
      avatar: this.props.user.userAvatar,
      room: this.props.host,
    };
    socket.emit('chat message avatar', messageAvatarObject);
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: '',
        room: this.props.host,
      },
    });
  };

  handleMessageChange = e => {
    e.preventDefault();
    let message = e.target.value;
    const now = moment();
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: message,
        host: this.props.host,
        timeStamp: now,
      },
    });
  };

  render() {
    return (
      <div >
        <form onSubmit={e => this.submitMessage(e)}>
        <div className='ui action input' style={msgStyle}>
          <input
            className="input-msg"
            type="text"
            placeholder="Enter New Message"
            value={this.state.newMessage.message}
            onChange={e => this.handleMessageChange(e)}
          />
          <button className='ui button' type="submit" value="Submit">Send</button>
        </div>
        </form>
        <style jsx>{`
          .input-msg {
            grid-column-start: 2;
            grid-row-start: 3;
          }
        `}</style>
      </div>
    );
  }
}

export default CreateMessage;
