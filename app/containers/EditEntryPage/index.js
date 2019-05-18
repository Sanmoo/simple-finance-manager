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
import parse from 'date-fns/parse';
import { SPREADSHEET_DATE_FORMATS } from 'utils/constants';

import {
  makeSelectFormValues,
  makeSelectCategories,
  makeSelectSubmitInProgress,
  makeSelectEditingEntriesKey,
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
  editingEntriesKey: makeSelectEditingEntriesKey(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateFormValue: (field, value) => dispatch(updateFormValue(field, value)),
    onCancelClick: () => dispatch(cancel()),
    onSubmit: formValues => dispatch(submitEntry(formValues)),
    onCategoriesLoaded: categories =>
      dispatch(saveKey('categories', categories)),
    onSetupEditForm: entry => {
      dispatch(
        saveKey('formValues', {
          date: parse(
            entry.date,
            SPREADSHEET_DATE_FORMATS['pt-BR'],
            new Date(),
          ),
          description: entry.desc,
          category: entry.category,
          credit:
            typeof entry.credit === 'boolean'
              ? entry.credit
              : entry.credit === 'true',
          value: parseFloat(entry.value || 0),
        }),
      );
      dispatch(
        saveKey('editingEntriesKey', {
          line: entry.line,
          type: entry.type,
          originSheetTitle: entry.originSheetTitle,
        }),
      );
    },
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
