import PropTypes from 'prop-types';
import React from 'react';

const Highlight = ({ value, tagName, isHighlighted }) => {
  const TagName = isHighlighted ? tagName : 'span';
  const className = isHighlighted
    ? 'ais-Highlight__highlighted'
    : 'ais-Highlight__nonHighlighted';

  return <TagName className={className}>{value}</TagName>;
};

Highlight.propTypes = {
  value: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  tagName: PropTypes.string.isRequired,
};

export default function Highlighter({
  hit,
  attributeName,
  highlight,
  highlightProperty,
  tagName,
  separator,
}) {
  const defaultTagName = 'span';
  const parsedHighlightedValue = highlight({
    hit,
    attributeName,
    highlightProperty,
  });

  return (
    <span className="ais-Highlight">
      {parsedHighlightedValue.map((item, i) => {
        if (Array.isArray(item)) {
          const isLast = parsedHighlightedValue.length - 1 === i;
          return (
            <span>
              {item.map((element, index) => (
                <Highlight
                  key={`split-${index}-${element.value}`}
                  value={element.value}
                  tagName={tagName}
                  isHighlighted={element.isHighlighted}
                />
              ))}
              {!isLast && separator}
            </span>
          );
        }

        return (
          <Highlight
            key={`split-${i}-${item.value}`}
            value={item.value}
            tagName={tagName}
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
  tagName: PropTypes.string,
};

Highlighter.defaultProps = {
  tagName: 'em',
  separator: ', ',
};
