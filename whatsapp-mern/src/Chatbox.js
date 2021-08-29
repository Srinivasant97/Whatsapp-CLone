import React from 'react';
import {Avatar} from '@material-ui/core';
import './Chatbox.css';

function Chatbox(){
    return(
        <div className="chatbox">
            <Avatar />
            <div className="chat-details">
                <h2>Name</h2>
                <p>Last Message</p>
            </div>


        </div>
    )
}

export default Chatbox;