import React, { useState, useEffect } from 'react';

import { store } from './App';
import { followAChatRoom, unfollowChatRooms } from './redux/actions';

import { Input } from 'antd';

import './Room.css';

export default function Room(props) {
  const { webSocket, name, roomID, messages } = props;

  const [ text, setText ] = useState(null);

  useEffect(() => {
    store.dispatch(followAChatRoom(roomID));

    return () => {
      store.dispatch(unfollowChatRooms());
    }
  }, [roomID]);

  function send() {
    if (!text) return; // send message only when text is not empty string

    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
      data: JSON.stringify({
        action: 'message',
        room_id: roomID,
        sender: name,
        content: text,
      }),
    };
    webSocket.send(JSON.stringify(msg));

    setText("");
  }

  function onTextChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="room_container">
      <div className="room_messages">
        <div className="room_message_container_wrapper">
          {(() => {
            if (messages) {
              let components = [];
              for (let i = messages.size-1; i >= 0; i--) {
                components.push(<Message key={i} data={messages.get(i)} ownName={name} />);
              }
              return components;
            } else {
              return null;
            }
          })()}
        </div>
      </div>
      <Input
        className="room_input"
        placeholder="Type your message"
        value={text}
        onChange={onTextChange}
        onPressEnter={send} />
    </div>
  );
}

function Message(props) {
  const { data, ownName } = props;

  return (
    <div className={"room_message_container " + (data.sender === ownName? "room_message_container_own" : "room_message_container_others")}>
      <p>{data.sender}</p>
      <div className={"room_message_box " + (data.sender === ownName? "room_message_box_own" : "room_message_box_others")}>
        <p className={"room_message_content " + (data.sender === ownName? "room_message_content_own" : "room_message_content_others")}>{data.content}</p>
      </div>
    </div>
  );
}
