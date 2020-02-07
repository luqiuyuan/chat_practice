const ACTIONS = {
  SUBSCRIBE_CHAT_CHANNEL: 'SUBSCRIBE_CHAT_CHANNEL',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
}

export const subscribeChatChannel = () => ({
  type: ACTIONS.SUBSCRIBE_CHAT_CHANNEL,
});

export const receiveMessage = (room_id, sender, content) => ({
  type: ACTIONS.RECEIVE_MESSAGE,
  data: {
    room_id: room_id,
    sender: sender,
    content: content,
  },
});

export default ACTIONS;
