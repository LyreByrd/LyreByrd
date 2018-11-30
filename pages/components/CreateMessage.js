import react from 'react';
import io from 'socket.io-client'
import moment from 'moment';

class CreateMessage extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvatar: this.props.user.userAvatar,
      newMessage: {
        user: this.props.user.username,
        message: '',
        room: this.props.host,
        timeStamp: '12:00 am'
      }
    }
  }
  
  submitMessage = (e) => {
    e.preventDefault();
    const socket = io('http://18.218.63.90:8000');
    const now = moment();
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: this.state.message,
        room: this.props.host,
        timeStamp: now
      }
    })
    socket.emit('chat message', this.state.newMessage);
    let messageAvatarObject = {
      user: this.props.user.username,
      avatar: this.props.user.userAvatar,
      room: this.props.host
    }
    socket.emit('chat message avatar', messageAvatarObject)
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: '',
        room: this.props.host
      }
    })
  }

  handleMessageChange = (message) => {
    const now = moment();
    this.setState({
      newMessage: {
        user: this.props.user.username,
        message: message,
        host: this.props.host,
        timeStamp: now,
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitMessage(e)}>
          <input type='text' 
            placeholder='Enter New Message'
            value={this.state.newMessage.message} 
            onChange={(event) => this.handleMessageChange(event.target.value)}/>
          <input type='submit'
            value='Submit'
          />
        </form>
      </div>
    )
  }
}

export default CreateMessage;
