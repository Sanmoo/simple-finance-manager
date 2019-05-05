/**
 *
 * SfmNavBar
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { signOff } from 'containers/App/actions';
import SfmNavBar from './SfmNavBar';

const withConnect = connect(
  null,
  { onSignOff: signOff },
);

export default compose(withConnect)(SfmNavBar);
