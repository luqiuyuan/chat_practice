import API from '../../api';
import ACTIONS from '../actions';

import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';

function* subscribeChatChannel() {
  yield call(API.subscribeChatChannel);
}

function* actSubscribeChatChannel() {
  yield takeLatest("SUBSCRIBE_CHAT_CHANNEL", subscribeChatChannel);
}

export default function* rootSaga() {
  yield all([
    actSubscribeChatChannel(),
  ]);
}
