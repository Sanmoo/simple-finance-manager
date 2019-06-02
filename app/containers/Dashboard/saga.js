/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put } from 'redux-saga/effects';
import {
  SAVE_KEY,
  CREATE_NEW_SPREADSHEET,
  ON_SYNC_LOCAL_CACHE,
  ACTIONABLE_DIALOG_NO_SHEETS,
  ACTIONABLE_DIALOG_PREVIOUS_MONTH_SHEET,
  CREATE_SHEET_FROM_GENERIC_TEMPLATE,
  CREATE_SHEET_FROM_PREVIOUS_MONTH,
  TRY_SYNC_AGAIN,
} from 'containers/Dashboard/constants';
import {
  createNewSpreadsheetFromTemplate,
  createSheetFromGenericTemplate,
  createSheetFromPreviousMonth,
  getDashboardInfo,
  syncLocalCache,
  getPreviousMonthSheetName,
  verifySheetExistence,
  getSpreadsheetUrl,
} from 'utils/business';
import { saveKey as saveGlobalKey } from 'containers/App/actions';
import { ERROR_SHEET_NOT_FOUND } from 'utils/constants';
import { saveKey, onSyncLocalCache } from './actions';

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

export function* handleSyncLocalCache({ sId }) {
  try {
    yield syncLocalCache(sId);
    const dashInfo = yield getDashboardInfo();
    const spreadsheetUrl = yield getSpreadsheetUrl(sId);
    yield put(saveKey('dashInfo', dashInfo));
    yield put(saveGlobalKey('spreadsheetUrl', spreadsheetUrl));
  } catch (e) {
    if (e && e.type === ERROR_SHEET_NOT_FOUND) {
      const lastMonthSheetName = getPreviousMonthSheetName();
      if (yield verifySheetExistence(sId, lastMonthSheetName)) {
        yield put(
          saveKey(
            'actionableDialogType',
            ACTIONABLE_DIALOG_PREVIOUS_MONTH_SHEET,
          ),
        );
      } else {
        yield put(saveKey('actionableDialogType', ACTIONABLE_DIALOG_NO_SHEETS));
      }
    } else {
      alert(
        'There was an unpexpected error while trying to sync with upstream spreadsheet',
      );
    }
  }
}

export function* handleCreateSheetFromGenericTemplate({ sId }) {
  yield put(saveKey('actionableDialogType', null));
  yield createSheetFromGenericTemplate(sId);
  yield put(onSyncLocalCache(sId));
}

export function* handleCreateSheetFromPreviousMonth({ sId }) {
  yield put(saveKey('actionableDialogType', null));
  yield createSheetFromPreviousMonth(sId);
  yield put(onSyncLocalCache(sId));
}

export function* handleTrySyncAgain({ sId }) {
  yield put(saveKey('actionableDialogType', null));
  yield put(onSyncLocalCache(sId));
}

export default function* saga() {
  yield takeLatest(SAVE_KEY, handleSaveKey);
  yield takeLatest(CREATE_NEW_SPREADSHEET, handleCreateNewSpreadsheet);
  yield takeLatest(ON_SYNC_LOCAL_CACHE, handleSyncLocalCache);
  yield takeLatest(
    CREATE_SHEET_FROM_GENERIC_TEMPLATE,
    handleCreateSheetFromGenericTemplate,
  );
  yield takeLatest(
    CREATE_SHEET_FROM_PREVIOUS_MONTH,
    handleCreateSheetFromPreviousMonth,
  );
  yield takeLatest(TRY_SYNC_AGAIN, handleTrySyncAgain);
}
