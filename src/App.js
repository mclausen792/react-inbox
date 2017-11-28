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

  handleStar = (i) => {
    let newData = this.state.messageData
    newData[i].starred = !newData[i].starred
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
  render(){
    console.log('App', messageData);
  return (
  <div>
    <Toolbar
      messageData ={this.state.messageData}
      onSelect = {this.handleSelect}
      checkAll={this.checkAll.bind(this)}
      someChecked={this.someChecked.bind(this)}
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
