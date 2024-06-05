import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './socket';
import { httpInstance } from './network/baseUrl';
import Chat from './pages/Chat';
function App() {

  function onConnect() {
    console.log("connected");
  }

  function onDisconnect() {
    console.log("disconnnected");
  }
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    httpInstance.post("/messages",{
      message: {
        id:"hello",
        title:"Hello",
        body:"A Body"
      }
    })

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <div className="App">
      <Chat/>
    </div>
  );
}

export default App;
