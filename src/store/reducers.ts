import { SnackbarsState } from './types';
import {
  AnySnackbarAction,
  ENQUEUE_SNACKBAR,
  EnqueueSnackbarAction,
  DISMISS_SNACKBAR,
  DismissSnackbarAction,
  DISMISS_ALL_SNACKBARS,
  DismissAllSnackbarsAction,
  REMOVE_SNACKBAR,
  RemoveSnackbarAction,
} from './actions';

const initialState: SnackbarsState = {
  snackbarQueue: [],
};

export function snackbarsReducer(state = initialState, action: AnySnackbarAction): SnackbarsState {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return enqueueSnackbar(state, action);
    case DISMISS_SNACKBAR:
      return dismissSnackbar(state, action);
    case DISMISS_ALL_SNACKBARS:
      return dismissAllSnackbars(state, action);
    case REMOVE_SNACKBAR:
      return removeSnackbar(state, action);
    default:
      return state;
  }
}

function enqueueSnackbar(state: SnackbarsState, action: EnqueueSnackbarAction): SnackbarsState {
  return {
    ...state,
    snackbarQueue: [...state.snackbarQueue, action.payload.snackbar],
  };
}

function dismissSnackbar(state: SnackbarsState, action: DismissSnackbarAction): SnackbarsState {
  return {
    ...state,
    snackbarQueue: state.snackbarQueue.map(s =>
      s.options.key === action.payload.snackbarKey ? { ...s, isDismissed: true } : s
    ),
  };
}

function dismissAllSnackbars(
  state: SnackbarsState,
  _action: DismissAllSnackbarsAction
): SnackbarsState {
  return {
    ...state,
    snackbarQueue: state.snackbarQueue.map(s => ({ ...s, isDismissed: true })),
  };
}

function removeSnackbar(state: SnackbarsState, action: RemoveSnackbarAction): SnackbarsState {
  return {
    ...state,
    snackbarQueue: state.snackbarQueue.filter(s => s.options.key !== action.payload.snackbarKey),
  };
}
