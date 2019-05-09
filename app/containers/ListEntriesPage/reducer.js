/*
 *
 * ListEntriesPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SAVE_KEY } from './constants';

export const initialState = {
  entries: [],
};

/* eslint-disable default-case, no-param-reassign */
const listEntriesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SAVE_KEY:
        draft[action.key] = action.value;
        break;
    }
  });

export default listEntriesPageReducer;
