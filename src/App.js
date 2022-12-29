import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FormControl, Input, Typography } from '@mui/material';
import './App.css';
import Message from './Message';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'
import {db} from './firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

function App() {
  const [message, setMessage] = useState("");
  const [userName, setuserName] = useState("");
  const [messages, setMessages]= useState([]);

  const collectionRef = collection(db, "messages");
  useEffect(()=>setuserName(prompt("Please enter your user name.")),[]) //run once when app component loads.
  useEffect(()=>{
    onSnapshot(query(collectionRef, orderBy("timestamp","desc")),(snapshot)=>{
      setMessages(snapshot.docs.map(doc =>
        ({id : doc.id, message : doc.data()})
       ))
    })
  }, [])
  
  const sendMessage = (event)=> {
    event.preventDefault();
    addDoc(collectionRef,{
      message : message,
      username : userName,
      timestamp : serverTimestamp()
    });
    setMessage("");
  }

  return (
    <div className="App">
     <Typography variant="h3" component="h1" className='welcome__heading'>
        Welcome {userName}
      </Typography>
      <img className='image__messenger' src='https://cdn.iconscout.com/icon/free/png-128/facebook-messenger-11-721951.png' alt='Messenger'></img>
      <form className='app__form'>
        <FormControl className='app__formcontrol' >
          <Input className='app__input' placeholder='Enter a message..' value={message} onChange={(event) =>setMessage(event.target.value)}/>
          <IconButton className='app__iconButton' disabled= {!message} variant="contained" type='submit' onClick={sendMessage}>
            <SendIcon/>
          </IconButton> 
        </FormControl>
      </form>
    
      <FlipMove>
      {messages.map(({id, message})=> (
       <Message key={id} userName={userName} message={message}/>
      ))} 
      </FlipMove>   
    </div>
  );
}

export default App;
