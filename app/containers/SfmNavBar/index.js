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
import injectReducer from 'utils/injectReducer';
import { makeSelectBarTitle, makeSelectDrawerOpen } from './selectors';
import SfmNavBar from './SfmNavBar';
import reducer from './reducer';
import { setDrawerOpen } from './actions';

const mapStateToProps = createStructuredSelector({
  title: makeSelectBarTitle(),
  drawerOpen: makeSelectDrawerOpen(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOff: () => dispatch(signOff()),
    onDrawerOpen: () => dispatch(setDrawerOpen(true)),
    onDrawerClose: () => dispatch(setDrawerOpen(false)),
    onDashboardClick: () => dispatch(push('/')),
    onEntriesClick: () => dispatch(push('/entries')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sfmNavBar', reducer });

export default compose(
  withConnect,
  withReducer,
)(SfmNavBar);
