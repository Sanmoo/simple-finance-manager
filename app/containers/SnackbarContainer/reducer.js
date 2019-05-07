/*
 *
 * SnackbarContainer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, CLOSE_SNACKBAR, POP_SNACKBAR } from './constants';

export const initialState = {
  open: false,
  message: null,
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const snackbarContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case POP_SNACKBAR:
        draft.open = true;
        draft.message = action.message;
        break;
      case CLOSE_SNACKBAR:
        return initialState;
    }
  });

export default snackbarContainerReducer;
