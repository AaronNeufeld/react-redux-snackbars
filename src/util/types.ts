export type OmitProps<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RequireProps<T, K extends keyof T> = {
  [P in K]-?: T[P];
} &
  OmitProps<T, K>;
