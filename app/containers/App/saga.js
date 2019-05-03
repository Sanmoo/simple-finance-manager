/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga/effects';
import { SAVE_KEY } from 'containers/App/constants';

export function* handleSaveKey({ key, value }) {
  if (key === 'authToken') {
    localStorage.setItem('authToken', value);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_KEY, handleSaveKey);
}
