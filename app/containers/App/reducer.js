/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import produce from 'immer';
import { SAVE_KEY } from './constants';

// The initial state of the App
export const initialState = {
  authToken: localStorage.getItem('authToken'),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_KEY:
        draft[action.key] = action.value;
        break;
    }
  });

export default appReducer;
