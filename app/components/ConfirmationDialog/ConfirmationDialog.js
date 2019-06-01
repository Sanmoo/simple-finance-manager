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
  onConfirmText,
  onDismissText,
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
          {onDismissText}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {onConfirmText}
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
  onConfirmText: PropTypes.string,
  content: PropTypes.string.isRequired,
  onDismissText: PropTypes.string,
};

ConfirmationDialog.defaultProps = {
  title: 'Atenção',
  onConfirmText: 'Confirm',
  onDismissText: 'Cancel',
};

export default memo(ConfirmationDialog);
