import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import messageData from './data/messageData.js';
import './index.css';
import Compose from './components/Compose'

const baseUrl = 'https://a-react-inbox.herokuapp.com/'

class App extends React.Component{
  constructor(props){
    super(props)
     this.state = {
     messageData:[],
     composing:false,
     checked: false,
     isChecked: false
    }
  }
  async componentDidMount() {
   const response = await fetch(baseUrl + 'api/messages')
   const json = await response.json()
   this.setState({messageData: json._embedded.messages})
  }

  async patchItem(message, newData){
    const response = await fetch(baseUrl + 'api/messages',{
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
   })
  this.setState({messageData: newData})
}

async createItem(message){
  const response = await fetch(baseUrl + 'api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    console.log(response);
    this.componentDidMount()
}

  handleStar = (i) => {
    let newData = this.state.messageData
    newData[i].starred = !newData[i].starred
    let selectStar = {
      "messageIds":[],
      "command":"star",
      "star": newData[i].starred,
    }
    console.log(selectStar)
    selectStar.messageIds.push(newData[i].id)
    selectStar.star = newData[i].starred
    this.patchItem(selectStar, newData)
    this.setState({messageData: newData})
  }

  handleSelect = (i) => {
    let newData = this.state.messageData
    newData[i].selected = !newData[i].selected
    this.setState({messageData: newData})
  }

markAsRead = () => {
  let newData = this.state.messageData;
  let messageIds = []

  let beenRead = {
    "messageIds":messageIds,
    "command":"read",
    "read":true
  }
for(var i = 0; i<newData.length; i++){
    if(newData[i].selected === true){
      if(newData[i].read === false){
        newData[i].read = true
        beenRead.messageIds.push(newData[i].id)
        beenRead.star = newData[i].read
      }
    }
  }
  this.patchItem(beenRead, newData)
    this.setState({messageData: newData})
  }

  markAsUnread = () => {
    let newData = this.state.messageData;
    let messageIds = []

    let notRead = {
      "messageIds":messageIds,
      "command":"read",
      "read":false
    }

    for(var i = 0; i<newData.length; i++){
      if(newData[i].selected === true){
        if(newData[i].read === true){
          newData[i].read = false
          messageIds.push(newData[i].id)
        }
      }
    }
    this.patchItem(notRead, newData)
    this.setState({messageData: newData})
  }

  applyLabel = (e) => {
    let newData = this.state.messageData;
    let messageIds = []
    let label = ""

    var newLabel = {
            "messageIds": messageIds,
            "command": "addLabel",
            "label" : ""
    }

    for(var i = 0; i< newData.length; i++){
      if(newData[i].selected === true){
        if(e.target.value !== 'Apply label'){
          label = e.target.value
          let labels = newData[i].labels
          if(labels.indexOf(label) === -1){
            labels.push(label)
          }
          messageIds.push(newData[i].id)
            newLabel.label = label
        }
      }
    }
    this.patchItem(newLabel, newData)
    this.setState({messageData: newData})
  }

  removeLabel = (e) => {
    let newData = this.state.messageData
    let messageIds = []
    let label = ""

    const unlabel = {
      "messageIds": messageIds,
      "command": "removeLabel",
      "label": ""
    }

    for(var i=0; i < newData.length; i++){
      if(newData[i].selected === true){
        if(e.target.value !== 'Remove Label'){
          label = e.target.value
          let labels = newData[i].labels
          if(labels.includes(label)){
            let i = labels.indexOf(label)
            labels.splice(i, 1)
          }
          messageIds.push(newData[i].id)
          unlabel.label = label
        }
      }
    }
    this.patchItem(unlabel, newData)
    this.setState({messageData: newData})
  }

  checkAll = () => {
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

  someChecked =() => {
    let newData = this.state.messageData
    let count = 0
     for(var i = 0; i < newData.length; i++){
     if(newData[i].selected){
       count++
       }
     }
   if(count > 0 && count < newData.length){
     return 'fa fa-minus-square-o'
   }else if(count === newData.length){
     return 'fa fa-check-square-o'
   }else{
     return 'fa fa-square-o'
   }
 }



delete = () => {
  let renderData = []
  let byeBye = {
  "messageIds": [],
  "command": "delete"
}
    let newData = this.state.messageData;
    for(var i = 0; i < newData.length; i++){
      if(newData[i].selected){
        byeBye.messageIds.push(newData[i].id)
      }
    }
    for(var i = 0; i<newData.length; i++){
      if(newData[i].selected !== true){
        renderData.push(newData[i])
      }
    }
      this.patchItem(byeBye, renderData)
    this.setState({messageData: renderData})
  }

  toggleCompose =() => {
    if (this.state.composing === true) {
      this.setState({composing: false})
    } else {
      this.setState({composing: true})
    }
  }


    submitMessage = (e) => {
      e.preventDefault();
      let composedMsg = {
          "subject": e.target.subject.value,
          "body": e.target.body.value,
      }
      console.log(composedMsg);
      this.createItem(composedMsg)
    }

    unreadCount = () =>{
      let unreadData = this.state.messageData
      let counter = 0
      for(var i =0; i<unreadData.length; i++){
        if(unreadData[i].read === false){
          counter++
        }
      }
      return counter
    }




render(){
  return (
  <div>
    <Toolbar
      toggleCompose={this.toggleCompose.bind(this)}
      messageData ={this.state.messageData}
      onSelect = {this.handleSelect}
      checkAll={this.checkAll.bind(this)}
      someChecked={this.someChecked.bind(this)}
      markAsRead={this.markAsRead.bind(this)}
      markAsUnread={this.markAsUnread.bind(this)}
      delete = {this.delete.bind(this)}
      applyLabel = {this.applyLabel.bind(this)}
      removeLabel = {this.removeLabel.bind(this)}
       unreadCount={this.unreadCount()}
      />
      {this.state.composing ? <Compose submitMessage={this.submitMessage.bind(this)}
      /> : null}
      <MessageList
        messageData={this.state.messageData}
        toggleStar={i => this.handleStar(i)}
        toggleSelect = {a => this.handleSelect(a)}
        />
</div>
   );
  }
}
export default App;
