const ACTIONS = {
  SUBSCRIBE_CHAT_CHANNEL: 'SUBSCRIBE_CHAT_CHANNEL',
  FOLLOW_A_CHAT_ROOM: 'FOLLOW_A_CHAT_ROOM',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
}

export const subscribeChatChannel = () => ({
  type: ACTIONS.SUBSCRIBE_CHAT_CHANNEL,
});

export const followAChatRoom = (room_id) => ({
  type: ACTIONS.FOLLOW_A_CHAT_ROOM,
  payload: {
    room_id: room_id,
  },
});

export const receiveMessage = (room_id, sender, content) => ({
  type: ACTIONS.RECEIVE_MESSAGE,
  payload: {
    room_id: room_id,
    sender: sender,
    content: content,
  },
});

export default ACTIONS;
