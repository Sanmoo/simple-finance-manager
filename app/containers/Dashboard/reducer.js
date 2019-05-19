import produce from 'immer';
import { SIGN_OFF } from 'containers/App/constants';
import { SAVE_KEY } from './constants';

// The initial state of the App
export const initialState = {
  dashInfo: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_KEY:
        draft[action.key] = action.value;
        break;
      case SIGN_OFF:
        return initialState;
    }
  });

export default reducer;
