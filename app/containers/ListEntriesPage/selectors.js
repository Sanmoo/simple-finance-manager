import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listEntriesPage state domain
 */

const selectListEntriesPageDomain = state =>
  state.listEntriesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListEntriesPage
 */

const makeSelectListEntriesPage = () =>
  createSelector(
    selectListEntriesPageDomain,
    substate => substate,
  );

export default makeSelectListEntriesPage;
export { selectListEntriesPageDomain };
