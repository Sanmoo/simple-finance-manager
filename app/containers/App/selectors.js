/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import {
  DASHBOARD_PAGE,
  EDIT_ENTRY_PAGE,
  LIST_ENTRY_PAGE,
} from 'utils/businessConstants';

const selectGlobal = state => state.global;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectCurrentPage = () =>
  createSelector(
    makeSelectLocation(),
    ({ pathname }) => {
      if (pathname.endsWith('/')) {
        return DASHBOARD_PAGE;
      }

      if (pathname.endsWith('entry')) {
        return EDIT_ENTRY_PAGE;
      }

      if (pathname.endsWith('entries')) {
        return LIST_ENTRY_PAGE;
      }

      return null;
    },
  );

const makeSelectAuthToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState && globalState.authToken,
  );

const makeSelectSId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.spreadsheetId,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectAuthToken,
  makeSelectSId,
  makeSelectCurrentPage,
};
