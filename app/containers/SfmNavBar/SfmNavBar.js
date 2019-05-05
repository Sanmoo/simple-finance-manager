/**
 *
 * SfmNavBar
 *
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ConfirmationDialog from 'components/ConfirmationDialog/Loadable';
import Typography from './Typography';

export const SfmNavBar = ({ onSignOff }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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

  const userMenuOpened = Boolean(anchorEl);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Dashboard
          </Typography>
          <div>
            <IconButton
              aria-owns={userMenuOpened ? 'menu-appbar' : undefined}
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
              open={userMenuOpened}
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
      <ConfirmationDialog
        opened={signOffDialogOpened}
        onDismiss={onSignOffDialogDismiss}
        onConfirm={onSignOffDialogConfirm}
        content="Tem certeza que deseja sair?"
      />
    </React.Fragment>
  );
};

SfmNavBar.propTypes = {
  onSignOff: PropTypes.func.isRequired,
};

export default SfmNavBar;
