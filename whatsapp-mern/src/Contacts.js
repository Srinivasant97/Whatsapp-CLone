import React from 'react';
import './Contacts.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core';
import {SearchRounded} from '@material-ui/icons';
import Chatbox from './Chatbox'

function Contacts(){
    return(
        <div className="contacts">
            <div className="header">
            <Avatar src="https://malayalam.cdn.zeenews.com/malayalam/sites/default/files/2021/02/08/108090-surya.jpg" />
            <div className="button">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            </div>

            <div className="search">
                <div className="search-input">
                    <SearchRounded />
                    <input placeholder="Search Chat" type="text"/>
                </div>
            </div>
            <div className="chatpeople">
                <Chatbox />
                <Chatbox />
                <Chatbox /> 
            </div>
        </div> 
    )
}

export default Contacts;

