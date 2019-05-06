/*
 *
 * SnackbarContainer actions
 *
 */

import { DEFAULT_ACTION, CLOSE_SNACKBAR, POP_SNACKBAR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function closeSnackbar() {
  return { type: CLOSE_SNACKBAR };
}

export function popSnackbar(message) {
  return {
    type: POP_SNACKBAR,
    message,
  };
}
