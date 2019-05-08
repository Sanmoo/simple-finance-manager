import { createSelector } from 'reselect';
import { makeSelectCurrentPage } from 'containers/App/selectors';
import { PAGES_TITLE_BAR } from 'utils/businessConstants';

const makeSelectBarTitle = () =>
  createSelector(
    makeSelectCurrentPage(),
    page => PAGES_TITLE_BAR[page],
  );

export { makeSelectBarTitle };
