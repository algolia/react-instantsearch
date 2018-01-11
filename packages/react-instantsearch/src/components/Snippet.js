import PropTypes from 'prop-types';
import React from 'react';
import createClassNames from './createClassNames';
import Highlighter from './Highlighter';

const cx = createClassNames('Snippet');

const Snippet = props => (
  <Highlighter {...props} highlightProperty="_snippetResult" cx={cx} />
);

Snippet.propTypes = {
  hit: PropTypes.object.isRequired,
  attributeName: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  tagName: PropTypes.string,
  nonHighlightedTagName: PropTypes.string,
  separator: PropTypes.node,
};

export default Snippet;
