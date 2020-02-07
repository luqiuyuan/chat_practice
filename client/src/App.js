import React, { useState } from 'react';

import './App.css';

import RoomInput from './RoomInput';
import RoomContainer from './redux/containers/room_container';
import reducer from './redux/reducers';
import { subscribeChatChannel, receiveMessage } from './redux/actions';
import rootSaga from './redux/sagas';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';

// use redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

// connect web socket
export const web_socket = connectWebSocket();

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

    store.dispatch(subscribeChatChannel());
  }
  web_socket.onmessage = (evt) => {
    console.log("Received: " + evt.data);

    let data = JSON.parse(evt.data);
    if (!data.type) {
      store.dispatch(receiveMessage(data.message.room_id, data.message.sender, data.message.content));
    }
  }
  web_socket.onclose = (evt) => {
    console.log("connection closed");
  }

  return web_socket;
}

export default App;
