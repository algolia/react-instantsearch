import React from 'react';
import PropTypes from 'prop-types';

const Hits = ({ cx, hits, hitComponent: HitComponent, header, footer }) => (
  // Spread the hit on HitComponent instead of passing the full object. BC.
  // ex: <HitComponent {...hit} key={hit.objectID} />

  <ul className={cx('list')}>
    {hits.map(hit => (
      <li className={cx('item')} key={hit.objectID}>
        <HitComponent hit={hit} />
      </li>
    ))}
  </ul>
);

Hits.propTypes = {
  cx: PropTypes.func.isRequired,
  hits: PropTypes.array,
  hitComponent: PropTypes.func.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
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
