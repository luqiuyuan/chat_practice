import React, { useState, useEffect } from 'react';

import { Input } from 'antd';

import './Room.css';

export default function Room(props) {
  const { webSocket, roomID, messages } = props;

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
  }, []);

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

    setText("");
  }

  function onTextChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="room_container">
      <div className="room_messages">
        {(() => {
          if (messages) {
            let components = [];
            for (let i = 0; i < messages.size; i++) {
              components.push(<Message key={i} data={messages.get(i)} />);
            }
            return components;
          } else {
            return null;
          }
        })()}
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
  const { data } = props;

  return (
    <div className="room_message_container room_message_own">
      <p>{data.sender}</p>
      <div className="room_message_box">
        <p className="room_message_content">{data.content}</p>
      </div>
    </div>
  );
}
