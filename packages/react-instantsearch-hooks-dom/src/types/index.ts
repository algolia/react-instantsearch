/**
 * Make certain keys of an object optional
 */
export type PartialKeys<TObj, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
  Partial<Pick<TObj, TKeys>>;

/**
 * Map from CSS classes used in UI components to the `classNames` API exposed to users
 */
export type ClassNames<TProps extends { classNames: Record<string, string> }> =
  Omit<TProps, 'classNames'> & { classNames?: Partial<TProps['classNames']> };
