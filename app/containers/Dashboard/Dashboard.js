import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmationDialog from 'components/ConfirmationDialog';
import styled from 'styled-components';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { getSheetTitleForCurrentMonth } from 'utils/business';
import {
  ACTIONABLE_DIALOG_NO_SHEETS,
  ACTIONABLE_DIALOG_PREVIOUS_MONTH_SHEET,
} from './constants';

import DashboardContent from './DashboardContent';

const styles = theme => ({
  speedDialWrapper: {
    position: 'relative',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const DashboardContainer = styled.div`
  padding-bottom: 56px;
  position: relative;
`;

const actions = [
  { icon: <AttachMoneyIcon />, name: 'Add Income' },
  { icon: <ReceiptIcon />, name: 'Add Expense' },
];

function Dashboard({
  sId,
  dashInfo,
  classes,
  onAddExpense,
  onAddIncome,
  onSpreadsheetIdProvided,
  addEntryButtonEnabled,
  onCreateNewSpreadsheet,
  isLoading,
  actionableDialogType,
  onCreateSheetFromGenericTemplate,
  onTrySyncAgain,
  onCreateSheetFromPreviousMonth,
}) {
  const [open, setOpen] = useState(false);

  if (!sId) {
    return (
      <SpreadsheetIdInputCard
        onCreateNewSpreadsheet={onCreateNewSpreadsheet}
        onSubmitSId={onSpreadsheetIdProvided}
        isLoading={isLoading}
      />
    );
  }

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const onClick = () => setOpen(!open);

  return (
    <DashboardContainer>
      {dashInfo && <DashboardContent dashInfo={dashInfo} />}
      <ConfirmationDialog
        opened={actionableDialogType === ACTIONABLE_DIALOG_PREVIOUS_MONTH_SHEET}
        title="Oops"
        content="We noted you have a sheet from last month, but not one for the current month. Would you like us to create a sheet for the current month using the previous one as template?"
        onConfirm={() => onCreateSheetFromPreviousMonth(sId)}
        onConfirmText="Yes, please do"
        onDismissText="No. Please try again"
        onDismiss={() => onTrySyncAgain(sId)}
      />
      <ConfirmationDialog
        opened={actionableDialogType === ACTIONABLE_DIALOG_NO_SHEETS}
        title="Oops"
        content={`Hey, it looks like you don't have a sheet named ${getSheetTitleForCurrentMonth()}. Would you like me to create one for you from a generic template?`}
        onConfirm={() => onCreateSheetFromGenericTemplate(sId)}
        onConfirmText="Yes, please do"
        onDismissText="No. Please try again"
        onDismiss={() => onTrySyncAgain(sId)}
      />
      <div className={classes.speedDialWrapper}>
        {addEntryButtonEnabled && (
          <SpeedDial
            ariaLabel="Action menu"
            className={classes.speedDial}
            hidden={false}
            icon={<SpeedDialIcon />}
            onBlur={onClose}
            onClick={onClick}
            onClose={onClose}
            onFocus={onOpen}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            open={open}
            direction="up"
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() =>
                  action.name === 'Add Income' ? onAddIncome() : onAddExpense()
                }
              />
            ))}
          </SpeedDial>
        )}
      </div>
    </DashboardContainer>
  );
}

Dashboard.propTypes = {
  sId: PropTypes.string,
  onSpreadsheetIdProvided: PropTypes.func.isRequired,
  dashInfo: PropTypes.any,
  classes: PropTypes.object.isRequired,
  onAddIncome: PropTypes.func.isRequired,
  onAddExpense: PropTypes.func.isRequired,
  addEntryButtonEnabled: PropTypes.bool.isRequired,
  onCreateNewSpreadsheet: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  actionableDialogType: PropTypes.string,
  onCreateSheetFromGenericTemplate: PropTypes.func.isRequired,
  onTrySyncAgain: PropTypes.func.isRequired,
  onCreateSheetFromPreviousMonth: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dashboard);
