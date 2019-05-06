import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the snackbarContainer state domain
 */

const selectSnackbarContainerDomain = state =>
  state.snackbarContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SnackbarContainer
 */

const makeSelectSnackbarContainer = () =>
  createSelector(
    selectSnackbarContainerDomain,
    substate => substate,
  );

const makeSelectOpen = () =>
  createSelector(
    makeSelectSnackbarContainer(),
    substate => substate.open,
  );

const makeSelectMessage = () =>
  createSelector(
    makeSelectSnackbarContainer(),
    substate => substate.message,
  );

export default makeSelectSnackbarContainer;
export { selectSnackbarContainerDomain, makeSelectOpen, makeSelectMessage };
