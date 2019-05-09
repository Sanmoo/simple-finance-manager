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
import { makeSelectEntries } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ListEntriesPage from './ListEntriesPage';
import { saveKey } from './actions';

const mapStateToProps = createStructuredSelector({
  entries: makeSelectEntries(),
});

function mapDispatchToProps(dispatch) {
  return {
    onEntriesLoaded: entries => dispatch(saveKey('entries', entries)),
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
