import {
  SAVE_KEY,
  CREATE_NEW_SPREADSHEET,
  ON_SYNC_LOCAL_CACHE,
  CREATE_SHEET_FROM_GENERIC_TEMPLATE,
  CREATE_SHEET_FROM_PREVIOUS_MONTH,
  TRY_SYNC_AGAIN,
} from './constants';

export function saveKey(key, value) {
  return {
    type: SAVE_KEY,
    key,
    value,
  };
}

export function createNewSpreadsheet() {
  return { type: CREATE_NEW_SPREADSHEET };
}

export function onSyncLocalCache(sId) {
  return { type: ON_SYNC_LOCAL_CACHE, sId };
}

export function createSheetFromGenericTemplate(sId) {
  return { type: CREATE_SHEET_FROM_GENERIC_TEMPLATE, sId };
}

export function createSheetFromPreviousMonth(sId) {
  return { type: CREATE_SHEET_FROM_PREVIOUS_MONTH, sId };
}

export function trySyncAgain(sId) {
  return { type: TRY_SYNC_AGAIN, sId };
}
