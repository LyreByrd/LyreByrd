import react from 'react';
import axios from 'axios';

const Chat = (props) => {

  const getChat = () => {
    axios.get('/chat')
    .then(data => {
      console.log(data);
    })
  }

  return (
    <div id='chat-window'>
      <div>chat window</div>
      
    </div>
  )
}

export default Chat;