import React, { useState } from 'react';

import { Input } from 'antd';

import './RoomInput.css'

export default function RoomInput(props) {
  const { onSubmit } = props;

  const [text, setText] = useState(null);

  function onTextChange(e) {
    setText(e.target.value);
  }

  function submit() {
    // submit only when text is not empty string
    if (text) {
      onSubmit(text);
    }
  }

  return (
    <div className="room_input_container">
      <Input
        className="room_input_input"
        placeholder="Room #"
        onChange={onTextChange} />
      <div
        className="room_input_button"
        onClick={submit}>
        <p className="room_input_go">Go -></p>
      </div>
    </div>
  );
}
