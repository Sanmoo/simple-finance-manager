import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main, // eslint-disable-line
          backgroundColor: lighten(theme.palette.secondary.light, 0.85), // eslint-disable-line
      } // eslint-disable-line
      : { // eslint-disable-line
        color: theme.palette.text.primary, // eslint-disable-line
        backgroundColor: theme.palette.secondary.dark, // eslint-disable-line
      }, // eslint-disable-line
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const TableToolbar = ({
  classes,
  title,
  onViewExpensesClick,
  onViewIncomesClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filters">
          <IconButton
            aria-label="Filters"
            onClick={evt => setAnchorEl(evt.currentTarget)}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              onViewExpensesClick();
              setAnchorEl(null);
            }}
          >
            Show Expenses
          </MenuItem>
          <MenuItem
            onClick={() => {
              onViewIncomesClick();
              setAnchorEl(null);
            }}
          >
            Show Income
          </MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onViewExpensesClick: PropTypes.func.isRequired,
  onViewIncomesClick: PropTypes.func.isRequired,
};

export default withStyles(toolbarStyles)(TableToolbar);
