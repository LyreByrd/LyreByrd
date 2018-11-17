import react from 'react';
import io from 'socket.io-client'

class CreateMessage extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      newMessage: {
        user: this.props.user,
        message: ''
      },

    }
  }
  
  submitMessage = (e) => {
    e.preventDefault();
    const socket = io('http://localhost:3000');
    socket.emit('chat message', this.state.newMessage);
    this.setState({
      newMessage: {
        user: this.props.user,
        message: ''
      }
    })
  }

  handleMessageChange = (message) => {
    this.setState({
      newMessage: {
        user: this.props.user,
        message: message
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