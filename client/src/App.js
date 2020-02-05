import React from 'react';
import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p
          className="App-link"
          onClick={() => {
            const msg = {
              command: 'message',
              identifier: JSON.stringify({
                channel: 'ChatChannel',
                room: '1',
              }),
              data: JSON.stringify({
                action: 'send_message',
                content: "Hello Cable",
              }),
            };
            ws.send(JSON.stringify(msg));
          }}
        >
          Learn React
        </p>
      </header>
    </div>
  );
}

export default App;
