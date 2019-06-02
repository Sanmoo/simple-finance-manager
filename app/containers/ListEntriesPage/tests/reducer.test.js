// import produce from 'immer';
import { TYPE_EXPENSE } from 'utils/businessConstants';
import listEntriesPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('listEntriesPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      entries: [],
      filterOptions: {
        shownType: TYPE_EXPENSE,
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(listEntriesPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
