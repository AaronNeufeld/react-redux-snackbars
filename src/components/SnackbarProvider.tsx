import React, { PropsWithChildren } from 'react';
import {
  SnackbarProvider as NotistackSnackbarProvider,
  SnackbarProviderProps as NotistackSnackbarProviderProps,
  SnackbarAction,
} from 'notistack';
import Notifier, { NotifierProps } from './Notifier';
import DefaultDismissButton from './DefaultDismissButton';
import { OmitProps } from 'util/types';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * @param S the root store type
 */
export type SnackbarProviderProps<S> = PropsWithChildren<
  NotifierProps<S> & {
    /** Provide notistack options, see https://iamhosseindhv.com/notistack/api#snackbarprovider */
    notistackOptions?: OmitProps<NotistackSnackbarProviderProps, 'children'>;
    /** By default, include an X button to dismiss the snackbar */
    showDefaultDismissButton?: boolean;
  }
>;

/**
 * @param S the root store type
 * @param props
 */
export function SnackbarProvider<S>(props: SnackbarProviderProps<S>) {
  return (
    <NotistackSnackbarProvider {...props.notistackOptions} action={getDefaultAction(props)}>
      {props.children}
      <ErrorBoundary fallback={null} onError={console.error}>
        <Notifier getSnackbarState={props.getSnackbarState} />
      </ErrorBoundary>
    </NotistackSnackbarProvider>
  );
}

function getDefaultAction<S>(props: SnackbarProviderProps<S>): SnackbarAction | undefined {
  if (props.notistackOptions?.action) {
    return props.notistackOptions.action;
  }

  if (props.showDefaultDismissButton) {
    return snackbarKey => <DefaultDismissButton snackbarKey={snackbarKey}></DefaultDismissButton>;
  }

  return undefined;
}
