import ACTIONS from '../actions';

import { Map, List } from 'immutable';

export default function reducer(state = Map({}), action) {
  switch (action.type) {
    case ACTIONS.RECEIVE_MESSAGE:
      let state_new = state; // shallow copy
      if (!state.get(action.payload.room_id)) {
        state_new = state.set(action.payload.room_id, List([]));
      }
      state_new = state_new.update(action.payload.room_id, list => list.push({
        sender: action.payload.sender,
        content: action.payload.content,
      }));
      return state_new;
    default:
      return state;
  }
}
