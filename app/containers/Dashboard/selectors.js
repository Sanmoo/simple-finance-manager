import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectDashInfo = () =>
  createSelector(
    selectDashboard,
    dashState => dashState.dashInfo,
  );

const makeSelectAddEntryButtonEnabled = () =>
  createSelector(
    selectDashboard,
    dashState => dashState.addEntryButtonEnabled,
  );

export { selectDashboard, makeSelectDashInfo, makeSelectAddEntryButtonEnabled };
