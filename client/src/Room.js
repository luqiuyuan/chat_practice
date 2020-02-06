import React, { useEffect } from 'react';

import { Input } from 'antd';

import './Room.css';

export default function Room(props) {
  const {webSocket} = props;

  useEffect(() => {
    // follow the chat room
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
      data: JSON.stringify({
        action: 'follow',
        room_id: 1,
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
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
      data: JSON.stringify({
        action: 'message',
        room_id: 1,
        sender: "Lu",
        content: "Hello Cable",
      }),
    };

    webSocket.send(JSON.stringify(msg));
  }

  return (
    <div className="room_container">
      <div className="room_messages">

      </div>
      <Input
        className="room_input"
        placeholder="Type your message"
        onPressEnter={send} />
    </div>
  );
}
