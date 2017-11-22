import cx from 'classnames';
const prefix = 'ais';

export default function classNames(block) {
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
