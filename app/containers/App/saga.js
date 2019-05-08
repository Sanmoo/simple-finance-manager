/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga/effects';
import { SAVE_KEY, SIGN_OFF } from 'containers/App/constants';

export function* handleSaveKey({ key, value }) {
  if (key === 'authToken') {
    localStorage.setItem('authToken', value);
  }

  if (key === 'spreadsheetId') {
    localStorage.setItem('spreadsheetId', value);
  }
}

export function* handleSignOff() {
  window.localStorage.clear();
}

export default function* saga() {
  yield takeLatest(SAVE_KEY, handleSaveKey);
  yield takeLatest(SIGN_OFF, handleSignOff);
}
