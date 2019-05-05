import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import App from './App';
import { saveKey } from './actions';
import { makeSelectAuthToken } from './selectors';
import reducer from './reducer';
import saga from './saga';

const mapStateToProps = createStructuredSelector({
  authToken: makeSelectAuthToken(),
});

const withConnect = connect(
  mapStateToProps,
  { saveKey },
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(App);
