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
import makeSelectListEntriesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ListEntriesPage from './ListEntriesPage';

const mapStateToProps = createStructuredSelector({
  listEntriesPage: makeSelectListEntriesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
