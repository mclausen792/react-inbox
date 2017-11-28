import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import messageData from './data/messageData.js';
import './index.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    messages:messageData
    }
  }

  toggleStar = (message) => {
    this.setState((prevState)=>{
      let index = prevState.messages.indexOf(message)
       prevState.messages[index].starred ?
       prevState.messages[index].starred = false :
       prevState.messages[index].starred = true
     })
   }

   toggleSelected = (message) => {
       this.setState((prevState)=>{
         let index = prevState.messages.indexOf(message)
         prevState.messages[index].selected ?
         prevState.messages[index].selected = false :
         prevState.messages[index].selected = true
       })
    }

    toggleSelectAll = () => {
       this.state.messages.forEach((e,i)=>{
       this.setState((prevState)=>{
       prevState.messages[i].selected = true
       })
     })
   }

  render(){
  return (
  <div>
    <Toolbar messageData={messageData} toggleSelectAll={ this.toggleSelectAll.bind(this)} />
      <MessageList messageData={messageData} isRead={ this.isRead } isStarred={ this.isStarred }  toggleSelected={ this.toggleSelected.bind(this) } toggleStar={ this.toggleStar.bind(this) } />
</div>
   );
  }
}
export default App;
