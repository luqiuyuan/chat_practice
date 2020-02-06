import { Map, List } from 'immutable';

export default function reducer(state = Map({}), action) {
  switch (action.type) {
    case 'RECEIVE':
      let state_new = state; // shallow copy
      if (!state.get(action.data.room_id)) {
        state_new = state.set(action.data.room_id, List([]));
      }
      state_new = state_new.update(action.data.room_id, list => list.push({
        sender: action.data.sender,
        content: action.data.content,
      }));
      return state_new;
    default:
      return state;
  }
}
