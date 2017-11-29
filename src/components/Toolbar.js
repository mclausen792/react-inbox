import React from 'react';



class Toolbar extends React.Component{

  getSelectClass () {
  switch(this.props.select){
    case 'all':
      return 'fa-check-square-o'
    case 'some':
      return  'fa-minus-square-o'
    case 'none':
    default:
      return 'fa-square-o'
  }
}
  render(){
    return(
      <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={this.props.checkAll.bind(this)}>
          <i className={`fa ${this.props.someChecked()}`}></i>
        </button>

       <button className="btn btn-default" onClick={this.props.markAsRead.bind(this)}>Mark As Read</button>

        <button className="btn btn-default" onClick={this.props.markAsUnread.bind(this)}>Mark As Unread</button>

        <select className="form-control label-select" onChange ={this.props.applyLabel}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
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
