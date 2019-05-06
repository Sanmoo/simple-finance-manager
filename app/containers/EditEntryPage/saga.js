/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put } from 'redux-saga/effects';
import { addNewEntry } from 'utils/business';
import { popSnackbar } from 'containers/SnackbarContainer/actions';
import { push } from 'connected-react-router';
import { addNewEntryFinished } from './actions';
import { SUBMIT_ENTRY, CANCEL } from './constants';

export function* handleSubmitEntry({ formValues }) {
  try {
    yield addNewEntry(formValues);
    yield put(addNewEntryFinished({ success: true }));
    // TODO remove hardcoded message from saga
    yield put(popSnackbar('Entry successfully added'));
    yield put(push('/'));
  } catch (e) {
    yield put(addNewEntryFinished({ success: false }));
    // TODO remove console, alert and handle this error better
    /* eslint-disable no-alert, no-console */
    console.log(e);
    alert('There was an error while trying to save the new entry.');
  }
}

export function* handleCancel() {
  yield put(push('/'));
}

export default function* saga() {
  yield takeLatest(SUBMIT_ENTRY, handleSubmitEntry);
  yield takeLatest(CANCEL, handleCancel);
}
