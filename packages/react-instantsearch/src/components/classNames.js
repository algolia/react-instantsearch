import cx from 'classnames';
const prefix = 'ais';

export default function classNames(block) {
  return (...elements) => ({
    className: cx(
      elements
        .filter(element => element !== undefined && element !== false)
        .map(
          element =>
            element === ''
              ? `${prefix}-${block}`
              : `${prefix}-${block}-${element}`
        )
    ),
  });
}

// Updated classNames function that takes two parameters:
// 1. an array for BEMified class names
// 2. a string for other class names
export function classNamesNew(block) {
  return (bemElements, otherElements) => ({
    className: `${cx(
      bemElements
        .filter(
          element =>
            element !== undefined && element !== false && element !== null
        )
        .map(
          element =>
            element === ''
              ? `${prefix}-${block}`
              : `${prefix}-${block}-${element}`
        )
    )}${otherElements ? ` ${otherElements}` : ''}`,
  });
}
