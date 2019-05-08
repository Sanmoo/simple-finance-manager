import { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectSId } from 'containers/App/selectors';
import { saveKey as saveGlobalKey } from 'containers/App/actions';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';

import Dashboard from './Dashboard';
import { saveKey } from './actions';
import {
  makeSelectDashInfo,
  makeSelectAddEntryButtonEnabled,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

const mapStateToProps = createStructuredSelector({
  sId: makeSelectSId(),
  dashInfo: makeSelectDashInfo(),
  addEntryButtonEnabled: makeSelectAddEntryButtonEnabled(),
});

export function mapDispatchToProps(dispatch) {
  return {
    saveKey: (key, val) => dispatch(saveKey(key, val)),
    onAddIncome: () => dispatch(push(`/entry?mode=${TYPE_INCOME}`)),
    onAddExpense: () => dispatch(push(`/entry?mode=${TYPE_EXPENSE}`)),
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
