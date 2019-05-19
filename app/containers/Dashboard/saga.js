/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put } from 'redux-saga/effects';
import {
  SAVE_KEY,
  CREATE_NEW_SPREADSHEET,
} from 'containers/Dashboard/constants';
import { createNewSpreadsheetFromTemplate } from 'utils/business';
import { saveKey as saveGlobalKey } from 'containers/App/actions';
import { saveKey } from './actions';

export function* handleSaveKey({ key, value }) {
  if (key === 'spreadsheetId') {
    window.localStorage.setItem('spreadsheetId', value);
  }
}

export function* handleCreateNewSpreadsheet() {
  try {
    yield put(saveKey('isLoading', true));
    const { spreadsheetId } = yield createNewSpreadsheetFromTemplate();
    yield put(saveGlobalKey('spreadsheetId', spreadsheetId));
  } catch (e) {
    /* eslint-disable no-alert */
    alert('There was an error while trying to create the spreadsheet.');
  } finally {
    yield put(saveKey('isLoading', false));
  }
}

export default function* saga() {
  yield takeLatest(SAVE_KEY, handleSaveKey);
  yield takeLatest(CREATE_NEW_SPREADSHEET, handleCreateNewSpreadsheet);
}
