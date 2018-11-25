import react from 'react';
import io from 'socket.io-client';
import CreateMessage from './CreateMessage';
import Messages from './Messages'
// import axios from 'axios';
// import { runInThisContext } from 'vm';

const messagesStyle = {
  border: 'solid 1px black',
  display: 'flex',
  flex: '1 1 auto',
  height: '500px',
  width: '400px',
  overflowY: 'scroll'
}
class Chat extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      users: {},
      messages: [],
      host: ''
    }
    this.messageRef = React.createRef();
  }

  componentDidMount() {

    //sets current user and host
    let currentUser = JSON.parse(localStorage.getItem('username'));
    this.setState({
      user: currentUser,
      host: this.props.host
    })

    //socket.io connection
    const socket = io('http://localhost:8000');
    // socket.connect();

    //on user connect
    socket.on('connect', () => {
      socket.emit('join room', this.props.host);
      socket.emit('user connected', this.state.user);
      socket.on('fetch messages', messages => {
        this.setState({
          messages: [...messages]
        })
      })
    })


    //handles changes in online users
    socket.on('update users', users => {
      this.setState({
        users: [...users]
      })
    })

    //updates message array on new message
    socket.on('chat message', message => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, ...message]
      }))
    })

    socket.on('user disconnected', (users) => {
      // console.log('user disconnected', usersObj);
      this.setState({
        users: [...users]
      })
    })

    this.messagesScrollDown();
  }

  componentDidUpdate() {
    this.messagesScrollDown();
  }

  messagesScrollDown = () => {
    const scrollHeight = this.messageRef.scrollHeight;
    const height = this.messageRef.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onlineUsers(users) {
    if (Object.keys(users).length > 0) {
      return Object.values(users).map((user, i) => {
        return <div key={i}>{user}</div>
      })
    }
  }


  render() {
    return (
      <div>
        <div>
          <div>Message Host: {this.state.host}</div>
          <div>Online Users:</div>
          {this.onlineUsers(this.state.users)}
        </div>
        <div 
          style={messagesStyle}
          ref={(el) => this.messageRef = el}>
          <Messages
            user={this.state.user} 
            messages={this.state.messages}
          />
          <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messageRef = el; }}>
          </div>
        </div>
        <CreateMessage 
          user={this.state.user}
          host={this.state.host}
        />
      </div>
    )
  }
}

  export default Chat;