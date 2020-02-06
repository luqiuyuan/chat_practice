import React from 'react';

import { Input } from 'antd';

import './Room.css';

export default function Room() {
  return (
    <div className="room_container">
      <div className="room_messages">

      </div>
      <Input
        className="room_input"
        placeholder="Type your message" />
    </div>
  );
}
