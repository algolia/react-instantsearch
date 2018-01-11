import PropTypes from 'prop-types';
import React from 'react';
import createClassNames from './createClassNames';
import Highlighter from './Highlighter';

const cx = createClassNames('Highlight');

const Highlight = props => (
  <Highlighter {...props} highlightProperty="_highlightResult" cx={cx} />
);

Highlight.propTypes = {
  hit: PropTypes.object.isRequired,
  attributeName: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  tagName: PropTypes.string,
  nonHighlightedTagName: PropTypes.string,
  separator: PropTypes.node,
};

export default Highlight;
