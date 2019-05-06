/*
 *
 * EditEntryPage actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_FORM_VALUE,
  SUBMIT_ENTRY,
  SAVE_KEY,
  ADD_NEW_ENTRY_FINISHED,
  CANCEL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateFormValue(field, value) {
  return {
    type: UPDATE_FORM_VALUE,
    field,
    value,
  };
}

export function submitEntry(formValues) {
  return {
    type: SUBMIT_ENTRY,
    formValues,
  };
}

export function saveKey(key, value) {
  return {
    type: SAVE_KEY,
    key,
    value,
  };
}

export function addNewEntryFinished(params) {
  return {
    type: ADD_NEW_ENTRY_FINISHED,
    ...params,
  };
}

export function cancel() {
  return { type: CANCEL };
}
