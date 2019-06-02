/**
 *
 * SfmNavBar
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { signOff } from 'containers/App/actions';
import { makeSelectSUrl } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectBarTitle, makeSelectDrawerOpen } from './selectors';
import SfmNavBar from './SfmNavBar';
import reducer from './reducer';
import { setDrawerOpen, goToSpreadsheet, copySpreadsheetLink } from './actions';
import saga from './saga';

const mapStateToProps = createStructuredSelector({
  title: makeSelectBarTitle(),
  drawerOpen: makeSelectDrawerOpen(),
  spreadsheetUrl: makeSelectSUrl(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOff: () => dispatch(signOff()),
    onDrawerOpen: () => dispatch(setDrawerOpen(true)),
    onDrawerClose: () => dispatch(setDrawerOpen(false)),
    onDashboardClick: () => dispatch(push('/')),
    onEntriesClick: () => dispatch(push('/entries')),
    onGoToSpreadsheetClick: link => dispatch(goToSpreadsheet(link)),
    onCopySpreadsheetLinkClicked: link => dispatch(copySpreadsheetLink(link)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sfmNavBar', reducer });
const withSaga = injectSaga({ key: 'sfmNavBar', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(SfmNavBar);
