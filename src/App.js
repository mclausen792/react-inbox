import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import messageData from './data/messageData.js';
import './index.css';
import Compose from './components/Compose'

class App extends React.Component{
  constructor(props){
    super(props)
     this.state = {
     messageData:messageData
    }

  }
  async componentDidMount() {
   const response = await fetch('https://a-react-inbox.herokuapp.com/api/messages')
   const json = await response.json()
   this.setState({messageData: json._embedded.messages})
  }

  async patchItem(item){
    const response = await fetch('https://a-react-inbox.herokuapp.com/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

    })
    this.setState({messageData:messageData})
  }


  handleStar = (i) => {
    let selectStar = {
      "messageIds":[],
      "command":"star",
      "star":true
    }
    let newData = this.state.messageData
    newData[i].starred = !newData[i].starred
    selectStar.messageIds.push(newData[i].id)
    selectStar.star = newData[i].starred
    this.patchItem(selectStar)
    this.setState({messageData: newData})
  }

  handleSelect = (i) => {
  let newData = this.state.messageData
  newData[i].selected = !newData[i].selected
  this.setState({messageData: newData})
}

  checkAll(){
    let newData = this.state.messageData;
    let check = 0;
    for(var i = 0; i < newData.length; i++){
      if(newData[i].selected === true){
        check++
      }else if(newData[i].selected === false || newData[i].selected == null){
        newData[i].selected = true
      }
    }
    if(check === newData.length){
      for(var j = 0; j < newData.length; j++){
        newData[j].selected = false;
      }
    }
    this.setState({messageData: newData})
  }

  someChecked(){
   let count = 0
   for(var i = 0; i < this.state.messageData.length; i++){
     if(this.state.messageData[i].selected){
       count++
     }
   }
   if(count > 0 && count < this.state.messageData.length){
     return 'fa fa-minus-square-o'
   }else if(count === this.state.messageData.length){
     return 'fa fa-check-square-o'
   }else{
     return 'fa fa-square-o'
   }
 }

markAsRead(){
  for(var i = 0; i<this.state.messageData.length; i++){
    if(this.state.messageData[i].selected === true){
      if(this.state.messageData[i].read === false){
        this.state.messageData[i].read = true
      }
    }
  }
  let messageData = this.state.messageData
  this.setState({messageData:messageData})
}
markAsUnread(){
  for(var i = 0; i<this.state.messageData.length; i++){
    if(this.state.messageData[i].selected === true){
      if(this.state.messageData[i].read === true){
        this.state.messageData[i].read = false
      }
    }
  }
  let messageData = this.state.messageData
  this.setState({messageData:messageData})
}

delete(){
    let newData = this.state.messageData;
    for(var i = 0; i < newData.length; i++){
      if(newData[i].selected){
        newData.splice(i,1)
      }
    }
    this.setState({messageData: newData})
  }

  applyLabel(e){
    let newData = this.state.messageData;
    for(var i = 0; i< newData.length; i++){
      if(newData[i].selected){
      if(e.target.value !== 'Apply label'){
      var arr = this.state.messageData[i].labels
      var label = e.target.value
      console.log('here', label);
      if(arr.indexOf(label) === -1){
        arr.push(label)
      }
      }
      }
    }
    this.setState({messageData:messageData})
  }
  render(){
    console.log('App', messageData);
  return (
  <div>
    <Toolbar
      messageData ={this.state.messageData}
      onSelect = {this.handleSelect}
      checkAll={this.checkAll.bind(this)}
      someChecked={this.someChecked.bind(this)}
      markAsRead={this.markAsRead.bind(this)}
      markAsUnread={this.markAsUnread.bind(this)}
      delete = {this.delete.bind(this)}
      applyLabel = {this.applyLabel.bind(this)}
           />
    <Compose />
      <MessageList
        messageData={this.state.messageData}
        toggleStar={this.handleStar}
        toggleSelect = {this.handleSelect}

      />
</div>
   );
  }
}
export default App;
