import "./Chat.scss"
import { process } from "../store/action/index"
import React, {useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from 'react-router-dom'

const Chat = ({socket}) => {
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])
    
    const messagesEndRef = useRef(null)
    
    const location = useLocation()
    const {username, roomname} = location.state
    
    const dispatch = useDispatch()

    const dispatchProcess = (encrypt, msg, cypher) => {
        dispatch(process(encrypt, msg, cypher));
    };

    useEffect( () => {
        socket.on("message", (data) => {
            dispatchProcess(false, data.text)
            console.log(data) 
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: data.text,
            });
            console.log(temp)
            setMessages([...temp])
        })

    }, [socket]);

    const sendData = () => {
        if (text !== ""){
            socket.emit("chat", text)
            setText("")
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(scrollToBottom, [messages])

    
    return (
        <div className="chat">
            <div className="user-name">
                <h2>
                    {username} <span style={{fontSize: "0.7rem"}}> in Room: {roomname} </span>
                </h2>
            </div>
            <div className="chat-message">
                {messages.map((i) => {
                    if(i.username === username){
                        return (
                            <div className="message">
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    } 
                    else {
                        return (
                            <div className="message mess-right">
                                <p>{i.text}</p>
                                <span>{i.username}</span>
                            </div>
                        );
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="send">
                <input
                    placeholder="enter message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => { if (e.key === "Enter") {sendData() } }}>
                </input>
                <button onClick={sendData}>Send</button>

            </div>

        </div>
    )
}

export default Chat