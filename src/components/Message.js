import React from 'react'




const Message = ({
  messageData,
  toggleStar,
  toggleSelected
  }) => {

   function isRead(read){
     return read ? 'read' : 'unread'
   }

   function isStarred(starred){ return starred ? '' : '-o' }

   function isSelected(selected){
     return selected ? 'selected' : ''
   }

    return(
      <div className={`row message ${isRead(messageData.read)} ${isSelected(messageData.selected)}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ !!messageData.selected} onChange={()=> toggleSelected(messageData)}/>
            </div>
            <div className="col-xs-2">
               <i className={`star fa fa-star${isStarred(messageData.starred)}`} onClick={ () => toggleStar(messageData) }></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {messageData.labels.map(label => <span className="label label-warning">{label}</span> )}
          <a href="#">
          {messageData.subject}
          </a>
        </div>
      </div>
    )
  }
export default Message
