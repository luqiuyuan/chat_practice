import React from 'react';

import { Input } from 'antd';

import './RoomInput.css'

export default function RoomInput(props) {
  const { onSubmit } = props;

  return (
    <div className="room_input_container">
      <Input
        className="room_input_input"
        placeholder="Room #" />
      <div
        className="room_input_button"
        onClick={onSubmit}>
        <p className="room_input_go">Go -></p>
      </div>
    </div>
  );
}
