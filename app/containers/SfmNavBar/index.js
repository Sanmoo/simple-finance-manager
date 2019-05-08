/**
 *
 * SfmNavBar
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { signOff } from 'containers/App/actions';
import { makeSelectBarTitle } from './selectors';
import SfmNavBar from './SfmNavBar';

const mapStateToProps = createStructuredSelector({
  title: makeSelectBarTitle(),
});

const withConnect = connect(
  mapStateToProps,
  { onSignOff: signOff },
);

export default compose(withConnect)(SfmNavBar);
