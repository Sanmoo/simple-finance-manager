/**
 *
 * SfmNavBar
 *
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ConfirmationDialog from 'components/ConfirmationDialog/Loadable';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from './Typography';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

const SfmNavBar = ({
  onSignOff,
  title,
  classes,
  drawerOpen,
  onDrawerOpen,
  onDrawerClose,
  theme,
  onDashboardClick,
  onEntriesClick,
}) => {
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

  if (!title) {
    return <div />;
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={onDrawerOpen}
            className={classNames(
              classes.menuButton,
              drawerOpen && classes.hide,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Entradas'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                if (index === 0) {
                  onDashboardClick();
                } else if (index === 1) {
                  onEntriesClick();
                } else {
                  throw new Error('Assert false');
                }
                onDrawerClose();
              }}
            >
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : <ReceiptIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
  title: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  onDashboardClick: PropTypes.func.isRequired,
  onEntriesClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SfmNavBar);
