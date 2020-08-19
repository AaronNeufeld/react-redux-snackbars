import React from 'react';
import { useDispatch } from 'react-redux';
import { SnackbarKey } from 'notistack';
import { IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { dismissSnackbar } from '../store/actions';

export type DefaultDismissButtonProps = {
  snackbarKey: SnackbarKey;
};

export default function DefaultDismissButton({ snackbarKey }: DefaultDismissButtonProps) {
  const dispatch = useDispatch();

  return (
    <IconButton
      size="small"
      aria-label="dismiss"
      color="inherit"
      onClick={_e => dispatch(dismissSnackbar(snackbarKey))}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}
