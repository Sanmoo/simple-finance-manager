import { SAVE_KEY, CREATE_NEW_SPREADSHEET } from './constants';

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
