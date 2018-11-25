import react from 'react';
import io from 'socket.io-client'

class CreateMessage extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      newMessage: {
        user: this.props.user,
        message: '',
        room: this.props.host
      },

    }
  }
  
  submitMessage = (e) => {
    e.preventDefault();
    const socket = io('http://localhost:8000');
    

    socket.emit('chat message', this.state.newMessage);
    this.setState({
      newMessage: {
        user: this.props.user,
        message: '',
        room: this.props.host
      }
    })
  }

  handleMessageChange = (message) => {
    this.setState({
      newMessage: {
        user: this.props.user,
        message: message,
        host: this.props.host,
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
            onChange={() => this.handleMessageChange(event.target.value)}/>
          <input type='submit'
            value='Submit'
          />
        </form>
      </div>
    )
  }
}

export default CreateMessage;