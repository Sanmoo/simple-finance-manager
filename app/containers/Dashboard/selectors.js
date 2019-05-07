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
    makeSelectDashInfo(),
    dashInfo => dashInfo && dashInfo.length > 0,
  );

export { selectDashboard, makeSelectDashInfo, makeSelectAddEntryButtonEnabled };
