import PropTypes from 'prop-types';
import React from 'react';

const Highlight = ({ tagName, highlights }) => (
  <span className="ais-Highlight">
    {highlights.map(({ value, isHighlighted }, i) => {
      const TagName = isHighlighted ? tagName : 'span';
      const className = isHighlighted
        ? 'ais-Highlight__highlighted'
        : 'ais-Highlight__nonHighlighted';

      return (
        <TagName key={`split-${i}-${value}`} className={className}>
          {value}
        </TagName>
      );
    })}
  </span>
);

Highlight.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      isHighlighted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  tagName: PropTypes.string,
};

export default function Highlighter({
  hit,
  attributeName,
  highlight,
  highlightProperty,
  tagName,
}) {
  const HighlightedTag = tagName || 'em';
  const parsedHighlightedValue = highlight({
    hit,
    attributeName,
    highlightProperty,
  });

  return (
    <Highlight tagName={HighlightedTag} highlights={parsedHighlightedValue} />
  );
}

Highlighter.propTypes = {
  hit: PropTypes.object.isRequired,
  attributeName: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  highlightProperty: PropTypes.string.isRequired,
  tagName: PropTypes.string,
};
