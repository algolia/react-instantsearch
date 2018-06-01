import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Highlight extends Component {
  static propTypes = {
    hit: PropTypes.shape({
      _highlightResult: PropTypes.object.isRequired,
    }).isRequired,
    attribute: PropTypes.string.isRequired,
  };

  replaceHighlightTags() {
    const { attribute, hit } = this.props;

    // It doesn't work at all this methods but that's okay for the POC
    return hit._highlightResult[attribute].value
      .replace('<em>', '<span class="ais-Highlight-highlighted">')
      .replace('</em>', '</span>');
  }

  render() {
    return (
      <span
        className="ais-Highlight"
        dangerouslySetInnerHTML={{ __html: this.replaceHighlightTags() }}
      />
    );
  }
}

export default Highlight;
