import "./App.scss"
import Chat from "./chat/Chat"
import Home from "./home/Home"
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client"; 

const socket = io.connect('https://blooming-crag-34958.herokuapp.com/');
function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>}/>
        <Route path="/chat/:roomname/:username" element={<Chat socket={socket}/>}/>
      </Routes> 
    </div>
  )
}

export default App;
