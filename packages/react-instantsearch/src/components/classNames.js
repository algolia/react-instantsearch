import cx from 'classnames';
const prefix = 'ais';

export default function classNames(block) {
  return (...bemElements) =>
    cx(
      bemElements
        .filter(
          element =>
            element !== undefined && element !== null && element !== false
        )
        .map(
          element =>
            element === ''
              ? `${prefix}-${block}`
              : `${prefix}-${block}-${element}`
        )
    );
}
