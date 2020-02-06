import React, { useState } from 'react';

import './App.css';

import RoomInput from './RoomInput';
import Room from './Room';

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
  
  const [page, setPage] = useState(0);

  if (page === 0) {
    return (
      <RoomInput onSubmit={setPage.bind(this, 1)} />
    );
  } else if (page === 1) {
    return (
      <Room />
    );
  }
}

export default App;
