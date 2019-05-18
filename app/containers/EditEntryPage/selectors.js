import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editEntryPage state domain
 */

const selectEditEntryPageDomain = state => state.editEntryPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditEntryPage
 */

const makeSelectEditEntryPage = () =>
  createSelector(
    selectEditEntryPageDomain,
    substate => substate,
  );

const makeSelectFormValues = () =>
  createSelector(
    makeSelectEditEntryPage(),
    substate => substate.formValues,
  );

const makeSelectCategories = () =>
  createSelector(
    makeSelectEditEntryPage(),
    substate => substate.categories,
  );

const makeSelectSubmitInProgress = () =>
  createSelector(
    makeSelectEditEntryPage(),
    substate => substate.submitInProgress,
  );

const makeSelectEditingEntriesKey = () =>
  createSelector(
    makeSelectEditEntryPage(),
    substate => substate.editingEntriesKey,
  );

export default makeSelectEditEntryPage;
export {
  selectEditEntryPageDomain,
  makeSelectFormValues,
  makeSelectCategories,
  makeSelectSubmitInProgress,
  makeSelectEditingEntriesKey,
};
