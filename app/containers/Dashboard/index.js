import { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Dashboard from './Dashboard';
import { saveKey } from './actions';
import { makeSelectSId, makeSelectDashInfo } from './selectors';

import reducer from './reducer';
import saga from './saga';

const mapStateToProps = createStructuredSelector({
  sId: makeSelectSId(),
  dashInfo: makeSelectDashInfo(),
});

const withConnect = connect(
  mapStateToProps,
  { saveKey },
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Dashboard);
