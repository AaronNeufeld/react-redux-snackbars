import { OptionsObject } from 'notistack';
import { RequireProps } from 'util/types';

export interface SnackbarsState {
  snackbarQueue: StoredSnackbar[];
}

/** Create an empty snackbar state object */
export const emptySnackbarsState = (): SnackbarsState => ({
  snackbarQueue: [],
});

export type Snackbar = {
  message: string;
  options: OptionsObject;
};

export type StoredSnackbar = {
  isDismissed: boolean;
  message: string;
  options: RequireProps<OptionsObject, 'key'>;
};
