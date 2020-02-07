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

}
