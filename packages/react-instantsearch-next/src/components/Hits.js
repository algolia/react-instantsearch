import React from 'react';
import PropTypes from 'prop-types';

const Hits = ({ hits, renderHit }) => (
  <div className="ais-Hits" style={{ marginTop: 8 }}>
    <ol className="ais-Hits-list">
      {hits.map(hit => (
        <li key={hit.objectID} className="ais-Hits-item">
          {renderHit(hit)}
        </li>
      ))}
    </ol>
  </div>
);

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderHit: PropTypes.func,
};

Hits.defaultProps = {
  renderHit: hit => <div>{JSON.stringify(hit).slice(0, 100)}...</div>,
};

export default Hits;
