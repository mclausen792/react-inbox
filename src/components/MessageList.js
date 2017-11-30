import React from 'react';
import Message from './Message'


const MessageList = (props) => {
    return(
    <div>
      {props.messageData.map(message =>
        <Message
          key={message.id}
          message={message}
          onStar={() => props.toggleStar(props.messageData.indexOf(message))}
          onSelect = {() => props.toggleSelect(props.messageData.indexOf(message))}
        />
      )}
   </div>
   )
  }

export default MessageList
