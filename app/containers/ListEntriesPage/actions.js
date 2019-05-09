/*
 *
 * ListEntriesPage actions
 *
 */

import { DEFAULT_ACTION, SAVE_KEY } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveKey(key, value) {
  return {
    type: SAVE_KEY,
    key,
    value,
  };
}
