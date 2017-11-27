import React from 'react';
import PropTypes from 'prop-types';
import classNames from './classNames.js';
import BaseWidget from './BaseWidget';

const widgetClassName = 'Results';
const cx = classNames(widgetClassName);

const Hits = ({ hits, hitComponent: HitComponent, header, footer }) => (
  // Spread the hit on HitComponent instead of passing the full object. BC.
  // ex: <HitComponent {...hit} key={hit.objectID} />
  <BaseWidget widgetClassName={widgetClassName} header={header} footer={footer}>
    <ul {...cx(['list'])}>
      {hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />)}
    </ul>
  </BaseWidget>
);

Hits.propTypes = {
  hits: PropTypes.array,
  hitComponent: PropTypes.func.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

Hits.defaultProps = {
  hitComponent: props => (
    <li
      {...cx(['item'])}
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      {JSON.stringify(props).slice(0, 100)}...
    </li>
  ),
};

export default Hits;
