import React from 'react'


class Message extends React.Component {
  isRead() {
    return this.props.message.read ? 'read' : 'unread'
  }
  selected(){
    return this.props.message.selected ? 'selected' : ''
  }
  isStarred() {
    return this.props.message.starred ? 'fa-star' : 'fa-star-o'
  }

render(){
    return(
    <div>
      <div className={`row message ${this.isRead()} ${this.selected()}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" name="checkName" onClick={this.props.onSelect} defaultChecked={this.props.message.selected}/>
            </div>
            <div className="col-xs-2">
               <i className={`fa star ${this.isStarred()}`} onClick={this.props.onStar}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.message.labels.map((label) => <span className="label label-warning" key={label.toString()}>{label}</span>)}
          <a href="#">
          {this.props.message.subject}
          </a>
        </div>
      </div>
    </div>
    )
  }
}

export default Message
