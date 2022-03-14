import type { CSSClass } from '../ui/lib/cx';

/**
 * Make certain keys of an object optional
 */
export type PartialKeys<TObj, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
  Partial<Pick<TObj, TKeys>>;

/**
 * Map from CSS Classes used internally by `ui` to the classes passed by users
 */
export type ClassNames<
  TProps extends { classNames: Record<string, CSSClass> }
> = { classNames?: { [className in keyof TProps['classNames']]?: string } };
