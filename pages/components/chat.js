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
      usernameInput: ''
    }
    this.messageRef = React.createRef();
  }

  componentDidMount() {

    let currentUser = JSON.parse(localStorage.getItem('username'));
    this.setState({
      user: currentUser
    })

    const socket = io('http://localhost:3000');
    // socket.connect();

    socket.on('connect', () => {
      console.log(this.props.location)
      // socket.room = props.path
      console.log('this user: ', this.state.user)
      socket.emit('user connected', this.state.user);
    })

    socket.on('online users', usersObj => {
      // console.log('init users', usersObj);
      // console.log('socket username ', socket.username)
      this.setState({
        users: usersObj
      })
    })

    socket.on('chat message', message => {
      // console.log('chat message on client from socket.io', message);
      // console.log('chat message on client from socket.io', Array.isArray(message));
      if(typeof message[0] === 'string') {
        message = message.map(string => {
          return JSON.parse(string)
        })
      }

      // console.log('message', message);
      // todo this is bad. im sending all messages to all users on new connection
      // todo need to make socket only send to new connection
      // todo will be easier once rooms are set up
      if (this.state.messages.length !== message.length) {
        this.setState((prevState) => ({
          messages: [...prevState.messages, ...message]
        }))
      } 
    })

      socket.on('user connected', usersObj => {
        // console.log('socket username ', socket.username)
        // console.log('user connected', usersObj);
        this.setState({
          users: usersObj
        })
        // console.log('users ',this.state.users)
      })

      socket.on('user disconnected', (usersObj) => {
        // console.log('user disconnected', usersObj);
        this.setState({
          users: usersObj
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
           <div>Online Users:</div>
           {this.onlineUsers(this.state.users)}
          </div>
          <div 
            style={messagesStyle}
            ref={(el) => this.messageRef = el}>
            <Messages 
              messages={this.state.messages}
            />
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { this.messageRef = el; }}>
            </div>
          </div>
          <CreateMessage 
            user={this.state.user}
          />
        </div>
      )
    }
  }

  export default Chat;