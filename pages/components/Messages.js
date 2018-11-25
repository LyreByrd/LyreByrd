const Messages = ({messages}) => {
  console.log('messages :', messages);

  return (
    <div>
      {messages.map((message, i) => {
        message = JSON.parse(message);
        return <div key={i}>{message.user}: {message.message}</div>
      })}
    </div>
  )
}

export default Messages;