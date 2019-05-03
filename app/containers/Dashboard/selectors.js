import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectSId = () =>
  createSelector(
    selectDashboard,
    dashState => dashState.spreadsheetId,
  );

const makeSelectDashInfo = () =>
  createSelector(
    selectDashboard,
    dashState => dashState.dashInfo,
  );

export { selectDashboard, makeSelectSId, makeSelectDashInfo };
