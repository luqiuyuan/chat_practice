import React from 'react';

import { Input } from 'antd';

import './App.css';

function App() {
  let ws = new WebSocket("ws://localhost:3000/cable");
  ws.onopen = (evt) => {
    console.log("connection opened");

    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
        room: '1',
      }),
    };
    ws.send(JSON.stringify(msg));
  }
  ws.onmessage = (evt) => {
    console.log("Received: " + evt.data);
  }
  ws.onclose = (evt) => {
    console.log("connection closed");
  }
  
  return (
    <div className="container">
      <Input placeholder="Room #" />
    </div>
  );
}

export default App;
