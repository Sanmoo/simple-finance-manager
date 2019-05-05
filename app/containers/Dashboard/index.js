import { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { signOff } from 'containers/App/actions';

import Dashboard from './Dashboard';
import { saveKey } from './actions';
import { makeSelectSId, makeSelectDashInfo } from './selectors';

const mapStateToProps = createStructuredSelector({
  sId: makeSelectSId(),
  dashInfo: makeSelectDashInfo(),
});

const withConnect = connect(
  mapStateToProps,
  { saveKey, onSignOff: signOff },
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
