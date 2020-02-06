export const receive = (room_id, sender, content) => ({
  type: 'RECEIVE',
  data: {
    room_id: room_id,
    sender: sender,
    content: content,
  },
});
