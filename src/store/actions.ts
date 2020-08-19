import { StoredSnackbar } from './types';
import { SnackbarKey, OptionsObject } from 'notistack';
import shortid from 'shortid';

/** All actions are prefixed with this value plus a forward slash */
export const ACTION_NAMESPACE = '@rrsnackbars';
export const ENQUEUE_SNACKBAR = '@rrsnackbars/ENQUEUE_SNACKBAR';
export const DISMISS_SNACKBAR = '@rrsnackbars/DISMISS_SNACKBAR';
export const DISMISS_ALL_SNACKBARS = '@rrsnackbars/DISMISS_ALL_SNACKBARS';
export const REMOVE_SNACKBAR = '@rrsnackbars/REMOVE_SNACKBAR';

/**
 * Enqueue the given snackbar
 */
export type EnqueueSnackbarAction = {
  type: typeof ENQUEUE_SNACKBAR;
  payload: {
    snackbar: StoredSnackbar;
  };
};

/**
 * Dismiss the snackbar with the given key. If no snackbar is found with the given key, there will be no effect.
 */
export type DismissSnackbarAction = {
  type: typeof DISMISS_SNACKBAR;
  payload: {
    snackbarKey: SnackbarKey;
  };
};

/**
 * Clear all snackbars.
 */
export type DismissAllSnackbarsAction = {
  type: typeof DISMISS_ALL_SNACKBARS;
};

/**
 * Remove the snackbar with the given key from the store. If no snackbar
 * is found with the given key, there will be no effect.
 *
 * Please note, this is used internally and generally does not need to
 * dispatched elsewhere. It is only exposed for completeness, but without
 * a corresponding action creator function.
 */
export type RemoveSnackbarAction = {
  type: typeof REMOVE_SNACKBAR;
  payload: {
    snackbarKey: SnackbarKey;
  };
};

export type AnySnackbarAction =
  | EnqueueSnackbarAction
  | DismissSnackbarAction
  | DismissAllSnackbarsAction
  | RemoveSnackbarAction;

///////////////////////////
// Action creators

/**
 * Create an 'enqueue snackbar' action.
 * @param message the message to display in the snackbar
 * @param options snackbar options, @see OptionsObject from notistack (https://iamhosseindhv.com/notistack/api#enqueuesnackbar-options)
 * @see EnqueueSnackbarAction
 */
export const enqueueSnackbar = (
  message: string,
  options?: OptionsObject
): EnqueueSnackbarAction => ({
  type: ENQUEUE_SNACKBAR,
  payload: {
    snackbar: {
      message,
      options: {
        ...options,
        key: options?.key || shortid.generate(),
      },
      isDismissed: false,
    },
  },
});

/**
 * Create a 'dismiss snackbar' action.
 * @param snackbarKey the key of the snackbar which should be dismissed
 * @see DismissSnackbarAction
 */
export const dismissSnackbar = (snackbarKey: SnackbarKey): DismissSnackbarAction => ({
  type: DISMISS_SNACKBAR,
  payload: {
    snackbarKey,
  },
});

/**
 * Create a 'dismiss all snackbars' action.
 * @see DismissAllSnackbarsAction
 */
export const dismissAllSnackbars = (): DismissAllSnackbarsAction => ({
  type: DISMISS_ALL_SNACKBARS,
});

/**
 * Create a 'remove snackbar' action.
 * @param snackbarKey the key of the snackbar which hsould be removed
 * @see RemoveSnackbarAction
 */
export const removeSnackbar = (snackbarKey: SnackbarKey): RemoveSnackbarAction => ({
  type: REMOVE_SNACKBAR,
  payload: {
    snackbarKey,
  },
});
