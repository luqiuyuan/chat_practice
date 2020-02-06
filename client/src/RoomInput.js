import React from 'react';

import { Input } from 'antd';

import './RoomInput.css'

export default function RoomInput() {
  return (
    <div className="container">
      <Input
        className="input"
        placeholder="Room #" />
      <div className="button">
        <p className="go">Go -></p>
      </div>
    </div>
  );
}
