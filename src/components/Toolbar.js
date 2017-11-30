import React from 'react';



class Toolbar extends React.Component{

  render(){

    return(
      <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge"> {this.props.unreadCount}</span>
          unread messages
        </p>

        <a className="btn btn-danger" onClick={this.props.toggleCompose.bind(this)}>
            <i className="fa fa-plus" ></i>
          </a>

        <button className="btn btn-default" onClick={this.props.checkAll.bind(this)}>
          <i className={this.props.someChecked()}></i>
        </button>

       <button className="btn btn-default" onClick={this.props.markAsRead.bind(this)}>Mark As Read</button>

        <button className="btn btn-default" onClick={this.props.markAsUnread.bind(this)}>Mark As Unread</button>

        <select className="form-control label-select" onChange ={this.props.applyLabel.bind(this)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange ={this.props.removeLabel.bind(this)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick = {this.props.delete.bind(this)}>
          <i className="fa fa-trash-o" ></i>
        </button>
      </div>
    </div>
  )
}
}
export default Toolbar
