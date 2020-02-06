import React, { useState } from 'react';

import './App.css';

import RoomInput from './RoomInput';
import Room from './Room';

function App() {
  const web_socket = connectWebSocket();

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

function connectWebSocket() {
  const web_socket = new WebSocket("ws://localhost:3000/cable");
  web_socket.onopen = (evt) => {
    console.log("connection opened");
  }
  web_socket.onmessage = (evt) => {
    console.log("Received: " + evt.data);
  }
  web_socket.onclose = (evt) => {
    console.log("connection closed");
  }

  return web_socket;
}

export default App;
