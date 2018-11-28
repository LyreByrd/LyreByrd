import moment from 'moment-shortformat';
// import short from 'moment-shortformat';

const Messages = ({messages, user, host}) => {
  
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
    alignSelf: 'flex-end',
    backgroundColor: '#42a5f5',
    borderRadius: '5px 5px 0px 5px',
    padding: '10px',
    filter: 'drop-shadow(0 10px 0.9rem #9e9e9e)'
  }
  
  const sentTriangle = {
    width: '0',
    height: '0',
    borderBottom: '10px solid #42a5f5',
    borderRight: '10px solid transparent',
    alignSelf: 'flex-end',
    filter: 'drop-shadow(0 10px 0.9rem #9e9e9e)'

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
    alignSelf: 'flex-end',
    backgroundColor: '#90caf9',
    borderRadius: '5px 5px 5px 0px',
    padding: '10px',
    filter: 'drop-shadow(0 10px 0.9rem #9e9e9e)',
  }
  
  const recTriangle = {
    width: '0',
    height: '0',
    borderBottom: '10px solid #90caf9',
    borderLeft: '10px solid transparent',
    alignSelf: 'flex-end',
    // filter: 'drop-shadow(0 10px 0.9rem #9e9e9e)',
    'zIndex': '1',
    position: 'relative',
  }

  const userAvatar = {
    width: '40px',
    height: '40px',
    padding: '5px',
    borderRadius: '50%',
    background: '#efefef',
    filter: 'drop-shadow(0 10px 0.9rem #9e9e9e)',
    marginRight: '10px'
    // border: '1px orange dotted',
    
  }
  console.log('users :', users);

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
              </div>
            )
          } else {
            //received message
            return (
              <div 
                key={i}
                style={messagesStyleRec}>
                {/* <img style={userAvatar} src={users[message.user].userAvatar}>
                  
                </img> */}
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
}

export default Messages;