/*
 *
 * ListEntriesPage reducer
 *
 */
import produce from 'immer';
import { TYPE_EXPENSE } from 'utils/businessConstants';
import { DEFAULT_ACTION, SAVE_KEY } from './constants';

export const initialState = {
  entries: [],
  filterOptions: {
    shownType: TYPE_EXPENSE,
  },
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
