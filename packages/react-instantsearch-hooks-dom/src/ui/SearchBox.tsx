import React from 'react';

import { cx } from './lib/cx';

import type {
  ChangeEvent,
  FormEvent,
  RefObject,
  JSXElementConstructor,
} from 'react';

export type SearchBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  inputRef: RefObject<HTMLInputElement>;
  isSearchStalled: boolean;
  onChange(event: ChangeEvent): void;
  onReset(event: FormEvent): void;
  onSubmit?(event: FormEvent): void;
  placeholder?: string;
  value: string;
  resetIconComponent?: JSXElementConstructor<IconProps>;
  submitIconComponent?: JSXElementConstructor<IconProps>;
  loadingIconComponent?: JSXElementConstructor<IconProps>;
  classNames?: Partial<SearchBoxClassNames>;
};

export type IconProps = {
  classNames: Partial<SearchBoxClassNames>;
};

export type SearchBoxClassNames = {
  /**
   * Class names to apply to the root element
   */
  root: string;
  /**
   * Class names to apply to the form element
   */
  form: string;
  /**
   * Class names to apply to the input element
   */
  input: string;
  /**
   * Class names to apply to the submit button
   */
  submit: string;
  /**
   * Class names to apply to the reset button
   */
  reset: string;
  /**
   * Class names to apply to the loading indicator element
   */
  loadingIndicator: string;
  /**
   * Class names to apply to the submit icon
   */
  submitIcon: string;
  /**
   * Class names to apply to the reset icon
   */
  resetIcon: string;
  /**
   * Class names to apply to the loading icon
   */
  loadingIcon: string;
};

function DefaultSubmitIcon({ classNames }: IconProps) {
  return (
    <svg
      className={cx('ais-SearchBox-submitIcon', classNames.submitIcon)}
      width="10"
      height="10"
      viewBox="0 0 40 40"
    >
      <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
    </svg>
  );
}

function DefaultResetIcon({ classNames }: IconProps) {
  return (
    <svg
      className={cx('ais-SearchBox-resetIcon', classNames.resetIcon)}
      viewBox="0 0 20 20"
      width="10"
      height="10"
    >
      <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
    </svg>
  );
}

function DefaultLoadingIcon({ classNames }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 38 38"
      stroke="#444"
      className={cx('ais-SearchBox-loadingIcon', classNames.loadingIcon)}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

export function SearchBox({
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  resetIconComponent: ResetIcon = DefaultResetIcon,
  submitIconComponent: SubmitIcon = DefaultSubmitIcon,
  loadingIconComponent: LoadingIcon = DefaultLoadingIcon,
  classNames = {},
  ...props
}: SearchBoxProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleReset(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div
      {...props}
      className={cx('ais-SearchBox', classNames.root, props.className)}
    >
      <form
        action=""
        className={cx('ais-SearchBox-form', classNames.form)}
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <input
          ref={inputRef}
          className={cx('ais-SearchBox-input', classNames.input)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={placeholder}
          spellCheck={false}
          maxLength={512}
          type="search"
          value={value}
          onChange={onChange}
        />
        <button
          className={cx('ais-SearchBox-submit', classNames.submit)}
          type="submit"
          title="Submit the search query."
        >
          <SubmitIcon classNames={classNames} />
        </button>
        <button
          className={cx('ais-SearchBox-reset', classNames.reset)}
          type="reset"
          title="Clear the search query."
          hidden={value.length === 0 && !isSearchStalled}
        >
          <ResetIcon classNames={classNames} />
        </button>
        <span
          className={cx(
            'ais-SearchBox-loadingIndicator',
            classNames.loadingIndicator
          )}
          hidden={!isSearchStalled}
        >
          <LoadingIcon classNames={classNames} />
        </span>
      </form>
    </div>
  );
}
