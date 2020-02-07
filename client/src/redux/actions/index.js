const ACTIONS = {
  SUBSCRIBE_CHAT_CHANNEL: 'SUBSCRIBE_CHAT_CHANNEL',
  RECEIVE: 'RECEIVE',
}

export const subscribeChatChannel = () => ({
  type: ACTIONS.SUBSCRIBE_CHAT_CHANNEL,
});

export const receive = (room_id, sender, content) => ({
  type: ACTIONS.RECEIVE,
  data: {
    room_id: room_id,
    sender: sender,
    content: content,
  },
});
