import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import App from './App';
import { saveKey } from './actions';
import { makeSelectAuthToken } from './selectors';

const mapStateToProps = createStructuredSelector({
  authToken: makeSelectAuthToken(),
});

const withConnect = connect(
  mapStateToProps,
  { saveKey },
);

export default compose(withConnect)(App);
