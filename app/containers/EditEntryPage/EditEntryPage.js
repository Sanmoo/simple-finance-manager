/**
 *
 * EditEntryPage
 *
 */

import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { loadExpenseCategoriesFromCurrentMonthCategoryGoals } from 'utils/business';
import { TYPE_EXPENSE } from 'utils/businessConstants';
import CircularProgress from '@material-ui/core/CircularProgress';
import messages from './messages';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit,
  },
});

export function EditEntryPage({
  classes,
  intl: { formatMessage },
  formValues: { date, description, credit, category, value },
  formValues,
  updateFormValue,
  onCancelClick,
  onSubmit,
  categories,
  onCategoriesLoaded,
  spreadsheetId,
  submitInProgress,
}) {
  const updateFormNumber = useCallback(
    evt => {
      const numberAsStr = evt.target.value;
      if (numberAsStr) {
        updateFormValue('value', parseFloat(numberAsStr));
      } else {
        updateFormValue('value', 0);
      }
    },
    [value, updateFormValue],
  );
  useEffect(() => {
    loadExpenseCategoriesFromCurrentMonthCategoryGoals().then(
      onCategoriesLoaded,
    );
  }, []);

  const submitDisabled =
    !date || !description || !category || value === 0 || submitInProgress;

  return (
    <div>
      <Helmet>
        <title>Adicionar Entrada</title>
        <meta
          name="description"
          content="Adicione uma nova entrada na planilha"
        />
      </Helmet>
      <form className={classes.container}>
        <TextField
          id="entry-date"
          label={formatMessage(messages.date)}
          className={classes.textField}
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={evt =>
            updateFormValue(
              'date',
              parse(evt.target.value, 'yyyy-MM-dd', new Date()),
            )
          }
          margin="dense"
        />
        <TextField
          id="entry-description"
          label={formatMessage(messages.description)}
          className={classes.textField}
          value={description}
          multiline
          onChange={evt => updateFormValue('description', evt.target.value)}
          margin="dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={credit}
              onChange={evt => updateFormValue('credit', evt.target.checked)}
              color="primary"
            />
          }
          className={classes.textField}
          label={formatMessage(messages.credit)}
        />
        <TextField
          id="entry-category"
          select
          label={formatMessage(messages.category)}
          className={classes.textField}
          value={category}
          onChange={evt => updateFormValue('category', evt.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {categories.map(categoryOption => (
            <MenuItem key={categoryOption} value={categoryOption}>
              {categoryOption}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="entry-value"
          label={formatMessage(messages.value)}
          className={classes.textField}
          value={value || ''}
          type="number"
          onChange={updateFormNumber}
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      {/* Form Actions */}
      <div>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={() =>
            onSubmit({ ...formValues, type: TYPE_EXPENSE, spreadsheetId })
          }
          disabled={submitDisabled}
        >
          {!submitInProgress && (
            <SaveIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
          )}
          {submitInProgress && (
            <CircularProgress
              className={classNames(classes.leftIcon, classes.iconSmall)}
              size={20}
            />
          )}
          Save
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={onCancelClick}
          disabled={submitInProgress}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

EditEntryPage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  formValues: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    credit: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
  updateFormValue: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoriesLoaded: PropTypes.func.isRequired,
  spreadsheetId: PropTypes.string.isRequired,
  submitInProgress: PropTypes.func.isRequired,
};

export default withStyles(styles)(injectIntl(EditEntryPage));