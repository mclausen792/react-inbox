import React from 'react';
import Message from './Message'


const MessageList = (props) =>{

  return(
    <div>
      {
        props.messageData.map((message) =>{
        return <Message
          key = {message.id}
          message={message}
          onStar={() => props.toggleStar(props.messageData.indexOf(message))}
          onSelect = {() => props.toggleSelect(props.messageData.indexOf(message))}
          labels= {message.labels} />
      })}
    </div>
  )
}



export default MessageList
