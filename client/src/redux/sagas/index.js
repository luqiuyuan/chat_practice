import API from '../../api';
import ACTIONS from '../actions';

import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';

function* subscribeChatChannel() {
  yield call(API.subscribeChatChannel);
}

function* actSubscribeChatChannel() {
  yield takeEvery("SUBSCRIBE_CHAT_CHANNEL", subscribeChatChannel);
}

function* followAChatRoom(action) {
  yield call(API.followAChatRoom, action.payload.room_id);
}

function* actFollowAChatRoom() {
  yield takeEvery(ACTIONS.FOLLOW_A_CHAT_ROOM, followAChatRoom);
}

export default function* rootSaga() {
  yield all([
    actSubscribeChatChannel(),
    actFollowAChatRoom(),
  ]);
}
