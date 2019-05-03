import produce from 'immer';
import { SAVE_KEY } from './constants';

// The initial state of the App
export const initialState = {
  spreadsheetId: window.localStorage.getItem('spreadsheetId'),
  dashInfo: { totalExpenses: 0, totalReceipt: 0 },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_KEY:
        draft[action.key] = action.value;
        break;
    }
  });

export default reducer;
