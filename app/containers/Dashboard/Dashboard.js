import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import MenuItem from '@material-ui/core/MenuItem';
import { useInjectReducer } from 'utils/injectReducer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useInjectSaga } from 'utils/injectSaga';
import { syncLocalCache, getDashboardInfo } from 'utils/business';
import ConfirmationDialog from 'components/ConfirmationDialog/Loadable';
import Typography from './Typography';
import DashboardContent from './DashboardContent';
import reducer from './reducer';
import saga from './saga';

const key = 'dashboard';

export default function Dashboard({ sId, saveKey, dashInfo, onSignOff }) {
  // TODO refactor this reducer and saga injection to index.js
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // Get Dashboard Info
  useEffect(() => {
    if (sId) {
      syncLocalCache(sId)
        .then(getDashboardInfo)
        .then(value => saveKey('dashInfo', value));
    }
  }, [sId, saveKey]);
  const [anchorEl, setAnchorEl] = useState(null);

  // TODO Refactor App Bar to dedicated container

  // Setup Callbacks
  const onSubmitSId = useCallback(value => saveKey('spreadsheetId', value), [
    saveKey,
  ]);
  const [signOffDialogOpened, setSignOffDialogOpened] = useState(false);
  const onSignOffMenuClicked = useCallback(
    () => setSignOffDialogOpened(true),
    [],
  );
  const onSignOffDialogDismiss = useCallback(
    () => setSignOffDialogOpened(false),
    [],
  );
  const onSignOffDialogConfirm = useCallback(() => {
    setSignOffDialogOpened(false);
    onSignOff();
  }, [onSignOff]);

  const open = Boolean(anchorEl);

  if (!sId) {
    return <SpreadsheetIdInputCard onSubmitSId={onSubmitSId} />;
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Dashboard
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={event => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onSignOffMenuClicked();
                }}
              >
                Sign off
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <DashboardContent {...dashInfo} />
      <ConfirmationDialog
        opened={signOffDialogOpened}
        onDismiss={onSignOffDialogDismiss}
        onConfirm={onSignOffDialogConfirm}
        content="Tem certeza que deseja sair?"
      />
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  sId: PropTypes.string,
  saveKey: PropTypes.func.isRequired,
  dashInfo: PropTypes.object.isRequired,
  onSignOff: PropTypes.func.isRequired,
};
