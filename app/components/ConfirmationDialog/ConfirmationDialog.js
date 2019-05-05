/*
 *
 * ConfirmationDialog
 *
 */

import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export const ConfirmationDialog = ({
  opened,
  onDismiss,
  onConfirm,
  title,
  content,
}) => (
  <div>
    <Dialog
      open={opened}
      onClose={onDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmationDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

ConfirmationDialog.defaultProps = {
  title: 'Atenção',
};

export default memo(ConfirmationDialog);
