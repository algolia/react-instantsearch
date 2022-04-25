import type { OptionalKeys } from './OptionalKeys';

export type WidgetProps<TUiProps> = Pick<TUiProps, OptionalKeys<TUiProps>>;
