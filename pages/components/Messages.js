import moment from 'moment-shortformat';
const placeholderData = require('../../static/placeholderAvatar.js').default;

// calculates relative timestamp
const ago = timeStamp => {
  return moment(timeStamp).short();
}

const messagesContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '390px',
  // border: '1px solid black',
}

const timeStampStyle = {
  fontSize: '0.6em',
  color: '#424242',
}

const messagesStyleSent = {
  alignSelf: 'flex-end',
  width: '300px',
  display: 'flex',
  justifyContent: 'flex-end',
  minHeight: '30px',
  margin: '10px',
  // border: '1px green dotted',
}

const messageSent = {
  maxWidth: '220px',
  alignSelf: 'flex-end',
  backgroundColor: '#42a5f5',
  borderRadius: '5px 5px 0px 5px',
  padding: '10px',
  filter: 'drop-shadow(0 10px 0.7rem #919191)',
  // border: '1px green dotted',
}

const sentTriangle = {
  width: '0',
  height: '0',
  borderBottom: '10px solid #42a5f5',
  borderRight: '10px solid transparent',
  alignSelf: 'flex-end',
  filter: 'drop-shadow(0 10px 0.7rem #919191)',
  
}

const messagesStyleRec = {
  alignSelf: 'flex-start',
  display: 'flex',
  justifyContent: 'flex-start',
  width: '300px',
  minHeight: '30px',
  margin: '10px',
  // border: '1px red dotted',
}

const messageRec = {
  maxWidth: '220px',
  alignSelf: 'flex-end',
  backgroundColor: '#90caf9',
  borderRadius: '5px 5px 5px 0px',
  padding: '10px',
  filter: 'drop-shadow(0 10px 0.7rem #919191)',
  // border: '1px red dotted',
}

const recTriangle = {
  width: '0',
  height: '0',
  borderBottom: '10px solid #90caf9',
  borderLeft: '10px solid transparent',
  alignSelf: 'flex-end',
  filter: 'drop-shadow(0 10px 0.7rem #919191)',
  'zIndex': '1',
  position: 'relative',
}

const userAvatar = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: '#efefef',
  filter: 'drop-shadow(0 10px 0.7rem #919191)',
  marginRight: '10px',
  marginLeft: '10px',
  border: '3px solid gray'
  // border: '1px orange dotted',
  
}

const Messages = ({messages, user, messageAvatars, host}) => {
  if (messageAvatars) {
    return (
      <div>
        <div style={messagesContainer}>
          {messages.map((message, i) => {
            message = JSON.parse(message);
            if (user.username === message.user) {
              //sent message
              return (
                <div 
                  key={i}
                  style={messagesStyleSent}>
                  <span style={messageSent}>
                    {message.message} 
                    <span style={timeStampStyle}> {ago(message.timeStamp)}</span>
                  </span>
                  <div style={sentTriangle}></div> 
                  <img style={userAvatar} src={messageAvatars[`${message.user}`] !== 'none' ? messageAvatars[`${message.user}`] : placeholderData} />
                </div>
              )
            } else {
              //received message
              return (
                <div 
                  key={i}
                  style={messagesStyleRec}>
                  <img style={userAvatar} src={messageAvatars[`${message.user}`] !== 'none' ? messageAvatars[`${message.user}`] : placeholderData} />
                  <div style={recTriangle}></div>
                  <span style={messageRec}>
                    {message.message} <span style={timeStampStyle}> {ago(message.timeStamp)}</span>
                  </span>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Messages;