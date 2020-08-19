export {
  SnackbarProviderProps as NotistackSnackbarProviderProps,
  OptionsObject,
  SnackbarProps as NotistackSnackbarProps,
  TransitionHandlerProps,
  IconVariant,
  SnackbarOrigin,
  CombinedClassKey,
  VariantClassKey,
  ContainerClassKey,
  TransitionHandler,
  TransitionEnterHandler,
  TransitionCloseHandler,
  SnackbarContent,
  SnackbarAction,
  SnackbarMessage,
  CloseReason,
  VariantType,
  SnackbarKey,
} from 'notistack';

export { SnackbarProvider, SnackbarProviderProps } from './components/SnackbarProvider';

export { SnackbarsState, emptySnackbarsState, Snackbar } from './store/types';
export {
  ACTION_NAMESPACE,
  ENQUEUE_SNACKBAR,
  DISMISS_SNACKBAR,
  DISMISS_ALL_SNACKBARS,
  REMOVE_SNACKBAR,
  EnqueueSnackbarAction,
  DismissSnackbarAction,
  DismissAllSnackbarsAction,
  RemoveSnackbarAction,
  AnySnackbarAction,
  enqueueSnackbar,
  dismissSnackbar,
  dismissAllSnackbars,
} from './store/actions';
export { snackbarsReducer } from './store/reducers';
