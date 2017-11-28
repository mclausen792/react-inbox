import React from 'react';
import Message from './Message'
import Toolbar from './Toolbar'

const MessageList = (props) => {
  console.log(props.messageData)
    return(
    <div>
      {props.messageData.map((message) => {
        return <Message
          key={message.id}
          message={message}
          onStar={() => props.toggleStar(message.id-1)}
          onSelect = {() => props.toggleSelect(message.id-1)}
        />
      })}
   </div>
   )
  }

export default MessageList
