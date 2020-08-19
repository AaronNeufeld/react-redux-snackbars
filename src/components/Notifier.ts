import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar as useNotistackSnackbar, SnackbarKey } from 'notistack';
import { removeSnackbar } from '../store/actions';
import { SnackbarsState } from 'store/types';

/**
 * @param S the root store type
 */
export type NotifierProps<S> = {
  /** provide a function to get the snackbar state (where you mounted the reducer) */
  getSnackbarState: (state: S) => SnackbarsState;
};

// Keep this "state" here instead of using a useState() hook because we don't want changing this array to cause a re-render
// Previously tried using useState(), but this resulted in the same snackbar getting re-enqueued if it was stuck in the
// notistack queue due to too many simultaneous snackbars (maxSnackbars prop)
const displayedSnackbarKeys = (() => {
  let _displayedSnackbarKeys: SnackbarKey[] = [];
  return {
    includes: (snackbarKey: SnackbarKey) => _displayedSnackbarKeys.includes(snackbarKey),
    store: (snackbarKey: SnackbarKey) =>
      (_displayedSnackbarKeys = [..._displayedSnackbarKeys, snackbarKey]),
    remove: (snackbarKey: SnackbarKey) =>
      (_displayedSnackbarKeys = _displayedSnackbarKeys.filter(key => snackbarKey !== key)),
  };
})();

/**
 * @param S the root store type
 * @param props
 */
export default function Notifier<S>(props: NotifierProps<S>) {
  const dispatch = useDispatch();
  const snackbarQueue = useSelector((state: S) => props.getSnackbarState(state).snackbarQueue);
  const {
    enqueueSnackbar: notistackEnqueueSnackbar,
    closeSnackbar: notistackCloseSnackbar,
  } = useNotistackSnackbar();

  useEffect(() => {
    snackbarQueue.forEach(snackbar => {
      const snackbarKey = snackbar.options.key;
      if (snackbar.isDismissed) {
        // dismiss snackbar using notistack
        notistackCloseSnackbar(snackbarKey);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayedSnackbarKeys.includes(snackbarKey)) {
        return;
      }

      // keep track of snackbars that we've displayed
      displayedSnackbarKeys.store(snackbarKey);
      // display snackbar using notistack
      notistackEnqueueSnackbar(snackbar.message, {
        ...snackbar.options,
        key: snackbarKey,
        onExited: (_node: HTMLElement, key: SnackbarKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(key));
          displayedSnackbarKeys.remove(key);
        },
      });
    });
  }, [snackbarQueue, notistackCloseSnackbar, notistackEnqueueSnackbar, dispatch]);

  return null;
}
