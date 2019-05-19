import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import { syncLocalCache, getDashboardInfo } from 'utils/business';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
  saveKey,
  dashInfo,
  classes,
  onAddExpense,
  onAddIncome,
  onSpreadsheetIdProvided,
  addEntryButtonEnabled,
  onCreateNewSpreadsheet,
  isLoading,
}) {
  useEffect(() => {
    if (sId) {
      syncLocalCache(sId)
        .then(getDashboardInfo)
        .then(value => saveKey('dashInfo', value));
    }
  }, [sId, saveKey]);

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
      <DashboardContent dashInfo={dashInfo} />
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
  saveKey: PropTypes.func.isRequired,
  onSpreadsheetIdProvided: PropTypes.func.isRequired,
  dashInfo: PropTypes.any,
  classes: PropTypes.object.isRequired,
  onAddIncome: PropTypes.func.isRequired,
  onAddExpense: PropTypes.func.isRequired,
  addEntryButtonEnabled: PropTypes.bool.isRequired,
  onCreateNewSpreadsheet: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Dashboard);
