/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put } from 'redux-saga/effects';
import { popSnackbar } from 'containers/SnackbarContainer/actions';
import copy from 'copy-to-clipboard';
import { COPY_SPREADSHEET_LINK, GO_TO_SPREADSHEET } from './constants';

export function* handleCopySpreadsheetLink({ link }) {
  copy(link);
  yield put(popSnackbar(`link successfully copied to clipboard`));
}

export function* handleGoToSpreadsheet({ link }) {
  window.open(link, '_blank');
}

export default function* saga() {
  yield takeLatest(COPY_SPREADSHEET_LINK, handleCopySpreadsheetLink);
  yield takeLatest(GO_TO_SPREADSHEET, handleGoToSpreadsheet);
}
