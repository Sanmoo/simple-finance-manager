import { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectSId } from 'containers/App/selectors';
import { saveKey as saveGlobalKey } from 'containers/App/actions';

import Dashboard from './Dashboard';
import { saveKey } from './actions';
import { makeSelectDashInfo } from './selectors';

import reducer from './reducer';
import saga from './saga';

const mapStateToProps = createStructuredSelector({
  sId: makeSelectSId(),
  dashInfo: makeSelectDashInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    saveKey: (key, val) => dispatch(saveKey(key, val)),
    onAddClick: () => dispatch(push('/entry')),
    onSpreadsheetIdProvided: sId =>
      dispatch(saveGlobalKey('spreadsheetId', sId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Dashboard);
