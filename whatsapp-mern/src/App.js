
import './App.css';
import Contacts from './Contacts';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

function App() {

  const [message,setMessage] = useState([]);

  useEffect(()=>{
    const instance =axios.create({
      baseURL:"http://localhost:9000",
    }) ;
    instance.get("/messages/sync").then((response)=>{
      setMessage(response.data);
    });

  },[]);

  useEffect(()=>{
    const pusher = new Pusher('393341fdbd200ec0276d', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe("messag");
    channel.bind("inserted",(data)=>{
      console.log(data)
      setMessage([...message,data])
    });



  },[message]);
  return (
    <div className="App">
      <div className="Container-1">
        <Contacts />
        <Chat message= {message}/>
      </div>
    </div>
  );
}

export default App;
