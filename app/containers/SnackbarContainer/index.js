/**
 *
 * SnackbarContainer
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';

import { makeSelectOpen, makeSelectMessage } from './selectors';
import { closeSnackbar } from './actions';
import reducer from './reducer';
import saga from './saga';
import SnackbarContainer from './SnackbarContainer';

const mapStateToProps = createStructuredSelector({
  open: makeSelectOpen(),
  message: makeSelectMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(closeSnackbar()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'snackbarContainer', reducer });
const withSaga = injectSaga({ key: 'snackbarContainer', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(SnackbarContainer);
