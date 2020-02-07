import React, { useState } from 'react';

import './App.css';

import RoomInput from './RoomInput';
import RoomContainer from './redux/containers/room_container';
import reducer from './redux/reducers';
import { receive } from './redux/actions';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// connect web socket
const web_socket = connectWebSocket();

function App() {
  const [ page, setPage ] = useState(0);
  const [ name, setName ] = useState(0);
  const [ room_id, setRoomID ] = useState(null);

  /**
   * go to room page
   * @param {*} room_id 
   */
  function goToRoom(name, room_id) {
    setPage(1);
    setName(name);
    setRoomID(room_id);
  }

  return (
    <Provider store={store}>
      {(() => {
        if (page === 0) {
          return (
            <RoomInput onSubmit={goToRoom} />
          );
        } else if (page === 1) {
          return (
            <RoomContainer
              webSocket={web_socket}
              name={name}
              roomID={room_id} />
          );
        }
      })()}
    </Provider>
  );
}

function connectWebSocket() {
  const web_socket = new WebSocket("ws://localhost:3000/cable");
  web_socket.onopen = (evt) => {
    console.log("connection opened");

    // subscribe the chat channel
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
    };
    web_socket.send(JSON.stringify(msg));
  }
  web_socket.onmessage = (evt) => {
    console.log("Received: " + evt.data);

    let data = JSON.parse(evt.data);
    if (!data.type) {
      store.dispatch(receive(data.message.room_id, data.message.sender, data.message.content));
    }
  }
  web_socket.onclose = (evt) => {
    console.log("connection closed");
  }

  return web_socket;
}

export default App;
