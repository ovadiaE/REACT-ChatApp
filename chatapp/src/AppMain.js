import React from "react"
import Process from "./process/Process"
import Chat from "./chat/Chat"
import "./App.scss"


const Appmain = ({socket, username, roomname}) => {
    return (
      <>
        <div className='right'>
          <Chat 
            username={username} 
            roomname={roomname} 
            socket={socket}> 
          </Chat>
        </div>
        <div className='left'>
          <Process/>
        </div>
      </>
    );
  }

  export default Appmain