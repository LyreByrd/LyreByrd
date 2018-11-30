import react from 'react';
import io from 'socket.io-client';
import CreateMessage from './CreateMessage';
import Messages from './Messages'
import axios from 'axios';

const container = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const messagesStyle = {
  // border: '1px black solid',
  background: '#cfcfcf',
  display: 'flex',
  flex: '1 1 auto',
  height: '500px',
  width: '400px',
  overflowY: 'scroll',
  float: 'right',
  marginTop: '10px',
}

const onlineUsersStyle = {
  marginLeft: '10px',
  marginTop: '10px',
}

const avatarStyle = {
  borderRadius: '50%',
  border: '3px solid gray'
};

class Chat extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        userAvatar: ''
      },
      users: {},
      messages: [],
      messageAvatars: {},
      host: '',
    }
    this.messageRef = React.createRef();
  }

  componentDidMount() {
    
    //sets current user and host
    let currentUser = localStorage.getItem('username');
    this.setState({
      user: currentUser,
      host: this.props.host
    }, () => {
      this.getUserAvatar(currentUser)
      .then(resolve => {
        this.socketConnect();
      })
    })



    this.messagesScrollDown();
  }

  socketConnect() {
    //socket.io connection
    const socket = io('18.218.63.90:8000');
    // socket.connect();

    //on user connect
    socket.on('connect', () => {
      // console.log('this.state.user :', this.state.user);
      socket.emit('join room', this.props.host);
      socket.emit('user connected', this.state.user);
      // socket.emit('user avatar', this.state.usersAvatars);
      socket.on('fetch messages', messages => {
        this.setState({
          messages: [...messages]
        })
      })
    })


    //handles changes in online users
    socket.on('update users', users => {
      // console.log('users :', users);
      this.setState({
        users: users
      })
    })

    //updates message array on new message
    socket.on('chat message', message => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, ...message]
      }))
    })

    socket.on('update message avatars', avatars => {
      this.setState({
        messageAvatars: avatars
      })
    })

    socket.on('user disconnected', (users) => {
      // console.log('user disconnected', usersObj);
      this.setState({
        users: users
      })
    })
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
    // console.log('users in onlineUsers:', users);
    if (Object.keys(users).length > 0) {
      return Object.entries(users).map((user, i) => {
        // console.log('user :', user);
        return (
          <div key={i}>
            <img style={avatarStyle} src={user[1] !== 'none' ? user[1] : null} width='50' height='50'></img>
            <div>{user[0]}</div>
          </div>
        )
      })
    }
  }

  getUserAvatar(username) {
    return new Promise((resolve, reject) => {
      resolve(
        axios.get('/user/profile/tinyAvatar', {
          // responseType: 'arraybuffer',
          params: {
            username: username
          }
        })
        .then(res => {
          this.setState({
            user: {
              username: username,
              userAvatar: res.data
            }
          })
        })
        .catch(err => {
          console.log('error getting avatar :', err);
        })
      )
    })
  }

  render() {
    return (
      <div>
        <div style={container}>
          <div 
            style={messagesStyle}
            ref={(el) => this.messageRef = el}>
            <Messages
              host={this.state.host}
              user={this.state.user}
              users={this.state.users}
              messages={this.state.messages}
              messageAvatars={this.state.messageAvatars}
            />
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messageRef = el; }}>
            </div>
          </div>
          <div style={onlineUsersStyle}>
            <div>Online Users:</div>
            {this.onlineUsers(this.state.users)}
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
