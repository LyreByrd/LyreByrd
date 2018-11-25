import moment from 'moment-shortformat';
// import short from 'moment-shortformat';

const Messages = ({messages}) => {
  
  // calculates relative timestamp
  const ago = timeStamp => {
    return moment(timeStamp).short();
  }

  const timeStampStyle = {
    fontSize: '0.7em',
  }

  const messagesRecieved = {}

  const messagesSent = {}

  return (
    <div>
      {messages.map((message, i) => {
        message = JSON.parse(message);
        return <div key={i}>{message.user}: {message.message} <span style={timeStampStyle}>{ago(message.timeStamp)}</span></div>
      })}
    </div>
  )
}

export default Messages;