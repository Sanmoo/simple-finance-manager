/**
 *
 * EditEntryPage
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectSId } from 'containers/App/selectors';

import {
  makeSelectFormValues,
  makeSelectCategories,
  makeSelectSubmitInProgress,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { updateFormValue, submitEntry, saveKey, cancel } from './actions';
import EditEntryPage from './EditEntryPage';

const mapStateToProps = createStructuredSelector({
  formValues: makeSelectFormValues(),
  categories: makeSelectCategories(),
  spreadsheetId: makeSelectSId(),
  submitInProgress: makeSelectSubmitInProgress(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateFormValue: (field, value) => dispatch(updateFormValue(field, value)),
    onCancelClick: () => dispatch(cancel()),
    onSubmit: formValues => dispatch(submitEntry(formValues)),
    onCategoriesLoaded: categories =>
      dispatch(saveKey('categories', categories)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editEntryPage', reducer });
const withSaga = injectSaga({ key: 'editEntryPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(EditEntryPage);
