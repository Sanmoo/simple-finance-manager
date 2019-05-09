import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { orderByDateDesc } from './utils';

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

const makeSelectEntries = () =>
  createSelector(
    makeSelectListEntriesPage(),
    substate => orderByDateDesc(substate.entries),
  );

export default makeSelectListEntriesPage;
export { selectListEntriesPageDomain, makeSelectEntries };
