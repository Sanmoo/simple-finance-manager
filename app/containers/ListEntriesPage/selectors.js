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

const makeSelectFilterOptions = () =>
  createSelector(
    makeSelectListEntriesPage(),
    substate => substate.filterOptions,
  );

const makeSelectShownType = () =>
  createSelector(
    makeSelectFilterOptions(),
    substate => substate.shownType,
  );

const makeSelectEntries = () =>
  createSelector(
    [makeSelectListEntriesPage(), makeSelectShownType()],
    (substate, shownType) =>
      orderByDateDesc(substate.entries.filter(e => e.type === shownType)),
  );

export default makeSelectListEntriesPage;
export { selectListEntriesPageDomain, makeSelectEntries, makeSelectShownType };
