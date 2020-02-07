import React, { useState } from 'react';

import { Input } from 'antd';

import './RoomInput.css'

export default function RoomInput(props) {
  const { onSubmit } = props;

  const [ name, setName ] = useState(null);
  const [ room_id, setRoomID ] = useState(null);

  function onNameChange(e) {
    setName(e.target.value);
  }
  function onRoomChange(e) {
    setRoomID(e.target.value);
  }

  function submit() {
    // submit only when text is not empty string
    if (name && room_id) {
      onSubmit(name, room_id);
    }
  }

  return (
    <div className="room_input_container">
      <Input
        className="room_input_input"
        placeholder="Your name"
        onChange={onNameChange} />
      <Input
        className="room_input_input"
        placeholder="Room #"
        onChange={onRoomChange} />
      <div
        className="room_input_button"
        onClick={submit}>
        <p className="room_input_go">Go -></p>
      </div>
    </div>
  );
}
