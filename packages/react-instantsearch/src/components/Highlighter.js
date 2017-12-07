import PropTypes from 'prop-types';
import React from 'react';
import classNames from './classNames.js';

const cx = classNames('Highlight');

const Highlight = ({
  value,
  highlightedTagName,
  isHighlighted,
  nonHighlightedTagName,
}) => {
  const TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
  const className = isHighlighted ? 'highlighted' : 'nonHighlighted';
  return <TagName {...cx(className)}>{value}</TagName>;
};

Highlight.propTypes = {
  value: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  highlightedTagName: PropTypes.string,
  nonHighlightedTagName: PropTypes.string,
};

export default function Highlighter({
  hit,
  attributeName,
  highlight,
  highlightProperty,
  highlightedTagName,
  nonHighlightedTagName,
  separator,
}) {
  const parsedHighlightedValue = highlight({
    hit,
    attributeName,
    highlightProperty,
  });

  return (
    <span {...cx('root')}>
      {parsedHighlightedValue.map((item, i) => {
        if (Array.isArray(item)) {
          const isLast = i === parsedHighlightedValue.length - 1;
          return (
            <span key={`split-${i}-${item.value}`}>
              {item.map((element, index) => (
                <Highlight
                  key={`split-${index}-${element.value}`}
                  value={element.value}
                  highlightedTagName={highlightedTagName}
                  nonHighlightedTagName={nonHighlightedTagName}
                  isHighlighted={element.isHighlighted}
                />
              ))}
              {!isLast && <span {...cx('separator')}>{separator}</span>}
            </span>
          );
        }

        return (
          <Highlight
            key={`split-${i}-${item.value}`}
            value={item.value}
            highlightedTagName={highlightedTagName}
            nonHighlightedTagName={nonHighlightedTagName}
            isHighlighted={item.isHighlighted}
          />
        );
      })}
    </span>
  );
}

Highlighter.propTypes = {
  hit: PropTypes.object.isRequired,
  attributeName: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  highlightProperty: PropTypes.string.isRequired,
  separator: PropTypes.node,
  highlightedTagName: PropTypes.string,
  nonHighlightedTagName: PropTypes.string.isRequired,
};

Highlighter.defaultProps = {
  highlightedTagName: 'em',
  nonHighlightedTagName: 'span',
  separator: ', ',
};
