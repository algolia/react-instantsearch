import type { OptionalKeys } from './OptionalKeys';

export type WidgetProps<T> = Pick<T, OptionalKeys<T>>;
