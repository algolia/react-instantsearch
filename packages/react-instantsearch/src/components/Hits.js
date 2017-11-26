import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from './classNames.js';

const cx = classNames('Hits');

class Hits extends Component {
  render() {
    const { hitComponent: ItemComponent, hits } = this.props;
    return (
      <div {...cx('root')}>
        {hits.map(hit => <ItemComponent key={hit.objectID} hit={hit} />)}
      </div>
    );
  }
}

Hits.propTypes = {
  hits: PropTypes.array,
  hitComponent: PropTypes.func.isRequired,
};

Hits.defaultProps = {
  hitComponent: props => (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      {JSON.stringify(props).slice(0, 100)}...
    </div>
  ),
};

export default Hits;
