import React from 'react';

import { cx } from './lib/cx';

export type ClearRefinementsTranslations = {
  /**
   * The label of the button
   */
  resetLabel: string;
};

type WrapperProps = React.ComponentProps<'div'>;

export type ClearRefinementsWidgetProps = WrapperProps & {
  classNames?: Partial<ClearRefinementsClassNames>;
};

export type ClearRefinementsProps = ClearRefinementsWidgetProps &
  Pick<React.ComponentProps<'button'>, 'disabled' | 'onClick'> & {
    translations: ClearRefinementsTranslations;
  };

export type ClearRefinementsClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the button
   */
  button: string;
  /**
   * Class names to apply to the button when it's disabled
   */
  disabledButton: string;
};

export function ClearRefinements({
  classNames = {},
  disabled,
  onClick,
  translations,
  ...props
}: ClearRefinementsProps) {
  return (
    <div
      {...props}
      className={cx('ais-ClearRefinements', classNames.root, props.className)}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={cx(
          'ais-ClearRefinements-button',
          classNames.button,
          disabled &&
            cx(
              'ais-ClearRefinements-button--disabled',
              classNames.disabledButton
            )
        )}
      >
        {translations.resetLabel}
      </button>
    </div>
  );
}
