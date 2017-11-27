import React from 'react';
import PropTypes from 'prop-types';
import classNames from './classNames.js';

const cx = classNames('Hits');

const Hits = ({ hits, hitComponent: HitComponent }) => (
  <div {...cx('root')}>
    {hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />)}
  </div>
);

Hits.propTypes = {
  hits: PropTypes.array,
  hitComponent: PropTypes.func.isRequired,
};

Hits.defaultProps = {
  // eslint-disable-next-line react/prop-types
  hitComponent: ({ hit }) => (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}...
    </div>
  ),
};

export default Hits;
