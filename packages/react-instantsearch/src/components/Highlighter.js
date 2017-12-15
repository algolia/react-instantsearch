import PropTypes from 'prop-types';
import React from 'react';

import classNames from './classNames.js';

export default function Highlighter({
  cx,
  hit,
  attributeName,
  highlight,
  highlightProperty,
  tagName,
}) {
  const parsedHighlightedValue = highlight({
    hit,
    attributeName,
    highlightProperty,
  });
  const reactHighlighted = parsedHighlightedValue.map((v, i) => {
    const key = `split-${i}-${v.value}`;
    if (!v.isHighlighted) {
      return (
        <span key={key} className={cx('nonHighlighted')}>
          {v.value}
        </span>
      );
    }
    const HighlightedTag = tagName ? tagName : 'em';
    return (
      <HighlightedTag key={key} className={cx('highlighted')}>
        {v.value}
      </HighlightedTag>
    );
  });
  return <span className={cx('')}>{reactHighlighted}</span>;
}

Highlighter.propTypes = {
  cx: PropTypes.func.isRequired,
  hit: PropTypes.object.isRequired,
  attributeName: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  highlightProperty: PropTypes.string.isRequired,
  tagName: PropTypes.string,
};
