import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import messageData from './data/messageData.js';
import './index.css';

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

  render(){
    console.log('App', messageData);
  return (
  <div>
    <Toolbar messageData ={this.state.messageData}/>
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
