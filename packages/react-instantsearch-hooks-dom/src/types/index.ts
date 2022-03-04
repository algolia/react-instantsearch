import type { CSSClass } from '../ui/lib/cx';

/**
 * Make certain keys of an object optional
 */
export type PartialKeys<TObj, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
  Partial<Pick<TObj, TKeys>>;

/**
 * Map from CSS Classes used internally by `ui` to the classes passed by users
 */
export type CSSClasses<
  TProps extends { cssClasses: Record<string, CSSClass> }
> = { cssClasses?: { [className in keyof TProps['cssClasses']]?: string } };
