import React, { useState } from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import './Chat.css'
import {SearchRounded} from '@material-ui/icons';
import { AttachFile } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon  from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';

function Chat({message}){
    const [input,setInput]= useState([]);
    const times=  new Date().toUTCString()
    const Submitted = (e) =>{
        e.preventDefault()
        const instance =axios.create({
            baseURL:"http://localhost:9000",
          }) ;
        instance.post("/messages/new",{
            message: input,
            name:"Vijay",
            timestamp: times,
            received:false
            
        })
        setInput("")
    }
    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Vijay_at_the_Nadigar_Sangam_Protest.jpg" />
                <div className="chat_header_info">
                    <h1>Name</h1>
                    <p>last seen...</p>
                </div>
                <div className="symbol-icon">
                    <IconButton>
                        <SearchRounded />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="convo-place">
                {message.map((mess) => (
                    <p className={`${mess.received && "message-receiver"  || "message"}`}>
                    <span className="person-name">{mess.name}</span>
                    <span className="person-message">{mess.message}</span>
                    <span className="message-time">{mess.timestamp}</span>
                </p>
                ))}
                
 
                
            </div>
            <div className="footer">
                <InsertEmoticonIcon />
                <form>
                    <input value ={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type a Message"/>
                    <IconButton onClick={Submitted} type="submit">
                         <SendIcon />
                    </IconButton>
                </form>
                <MicIcon />

            </div>

        </div>
    )
}


export default Chat;