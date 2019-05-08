import { createSelector } from 'reselect';
import { makeSelectCurrentPage } from 'containers/App/selectors';
import { PAGES_TITLE_BAR } from 'utils/businessConstants';
import { initialState } from './reducer';

const selectsfmNavBarDomain = state => state.sfmNavBar || initialState;

const makeSelectBarTitle = () =>
  createSelector(
    makeSelectCurrentPage(),
    page => PAGES_TITLE_BAR[page],
  );

const makeSelectDrawerOpen = () =>
  createSelector(
    selectsfmNavBarDomain,
    substate => substate.drawerOpen,
  );

export { makeSelectBarTitle, makeSelectDrawerOpen };
