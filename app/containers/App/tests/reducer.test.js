import produce from 'immer';

import appReducer from '../reducer';
import { signOff, saveKey } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      authToken: null,
      spreadsheetId: null,
      spreadsheetUrl: null,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the saveKey action correctly', () => {
    const newAuthToken = 'myAuthToken';
    const expectedResult = produce(state, draft => {
      draft.authToken = newAuthToken;
    });

    expect(appReducer(state, saveKey('authToken', newAuthToken))).toEqual(
      expectedResult,
    );
  });

  describe('given an authToken and spreadsheetId are already in state', () => {
    beforeEach(() => {
      state.authToken = 'myAuthToken';
      state.spreadsheetId = 'mySpreadsheetId';
    });

    it('should handle the signOff action correctly', () => {
      const expectedResult = produce(state, draft => {
        draft.authToken = null;
        draft.spreadsheetId = null;
      });

      expect(appReducer(state, signOff())).toEqual(expectedResult);
    });
  });
});
