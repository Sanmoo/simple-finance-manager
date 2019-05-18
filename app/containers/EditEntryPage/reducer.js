/*
 *
 * EditEntryPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPDATE_FORM_VALUE,
  SAVE_KEY,
  ADD_NEW_ENTRY_FINISHED,
  SUBMIT_ENTRY,
  CANCEL,
} from './constants';

export const initialState = {
  formValues: {
    date: new Date(),
    description: '',
    category: '',
    credit: false,
    value: 0,
  },
  categories: [],
  submitInProgress: false,
  editingEntriesKey: null,
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const editEntryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SUBMIT_ENTRY:
        draft.submitInProgress = true;
        break;
      case UPDATE_FORM_VALUE:
        draft.formValues[action.field] = action.value;
        break;
      case ADD_NEW_ENTRY_FINISHED:
        draft.submitInProgress = false;
        draft.formValues = action.success
          ? initialState.formValues
          : state.formValues;
        break;
      case CANCEL:
        return initialState;
      case SAVE_KEY:
        draft[action.key] = action.value;
        break;
    }
  });

export default editEntryPageReducer;
