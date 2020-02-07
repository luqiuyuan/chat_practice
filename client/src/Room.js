import React, { useState, useEffect } from 'react';

import { Input } from 'antd';

import './Room.css';

export default function Room(props) {
  const { webSocket, roomID } = props;

  const [ text, setText ] = useState(null);

  useEffect(() => {
    // follow the chat room
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
      data: JSON.stringify({
        action: 'follow',
        room_id: roomID,
      }),
    };
    webSocket.send(JSON.stringify(msg));

    return () => {
      // unfollow all chat rooms
      const msg = {
        command: 'message',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
        }),
        data: JSON.stringify({
          action: 'unfollow',
        }),
      };
      webSocket.send(JSON.stringify(msg));
    }
  });

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
        sender: "Lu",
        content: text,
      }),
    };

    webSocket.send(JSON.stringify(msg));
  }

  function onTextChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="room_container">
      <div className="room_messages">

      </div>
      <Input
        className="room_input"
        placeholder="Type your message"
        onChange={onTextChange}
        onPressEnter={send} />
    </div>
  );
}
