/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga/effects';
import { SAVE_KEY } from 'containers/Dashboard/constants';

export function* handleSaveKey({ key, value }) {
  if (key === 'spreadsheetId') {
    window.localStorage.setItem('spreadsheetId', value);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_KEY, handleSaveKey);
}
