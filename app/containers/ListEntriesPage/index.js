/**
 *
 * ListEntriesPage
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { makeSelectEntries, makeSelectShownType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ListEntriesPage from './ListEntriesPage';
import { saveKey } from './actions';

const mapStateToProps = createStructuredSelector({
  entries: makeSelectEntries(),
  shownType: makeSelectShownType(),
});

function mapDispatchToProps(dispatch) {
  return {
    onEntriesLoaded: entries => dispatch(saveKey('entries', entries)),
    onViewExpensesClick: () =>
      dispatch(saveKey('filterOptions', { shownType: TYPE_EXPENSE })),
    onViewIncomesClick: () =>
      dispatch(saveKey('filterOptions', { shownType: TYPE_INCOME })),
    onEditEntryClick: entry =>
      dispatch(
        push(
          `/entry?${queryString.stringify({
            ...entry,
            credit: entry.credit === 'y',
          })}`,
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'listEntriesPage', reducer });
const withSaga = injectSaga({ key: 'listEntriesPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(ListEntriesPage);
