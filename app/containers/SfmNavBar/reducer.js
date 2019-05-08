/*
 *
 * SfmNavBar reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_DRAWER_OPEN } from './constants';

export const initialState = {
  drawerOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const sfmNavBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_DRAWER_OPEN:
        draft.drawerOpen = action.open;
        break;
    }
  });

export default sfmNavBarReducer;
