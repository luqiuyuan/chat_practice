import { web_socket } from './App';

export default class API {

  static subscribeChatChannel() {
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
    };
    web_socket.send(JSON.stringify(msg));
  }

  static followAChatRoom(room_id) {
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'ChatChannel',
      }),
      data: JSON.stringify({
        action: 'follow',
        room_id: room_id,
      }),
    };
    web_socket.send(JSON.stringify(msg));
  }

}
