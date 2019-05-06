import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectDashInfo = () =>
  createSelector(
    selectDashboard,
    dashState => dashState.dashInfo,
  );

export { selectDashboard, makeSelectDashInfo };
