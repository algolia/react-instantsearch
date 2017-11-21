import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseWidget from './BaseWidget';
import { classNamesNew } from './classNames.js';

const widgetClassName = 'Results';
const cx = classNamesNew(widgetClassName);

class Hits extends Component {
  render() {
    const { hitComponent: ItemComponent, hits } = this.props;
    return (
      <BaseWidget widgetClassName={widgetClassName}>
        <ul {...cx(['list'])}>
          {hits.map(hit => <ItemComponent key={hit.objectID} hit={hit} />)}
        </ul>
      </BaseWidget>
    );
  }
}

Hits.propTypes = {
  hits: PropTypes.array,
  hitComponent: PropTypes.func.isRequired,
};

/* eslint-disable react/display-name */
Hits.defaultProps = {
  hitComponent: hit => (
    <li
      {...cx(['item'])}
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}...
    </li>
  ),
};
/* eslint-enable react/display-name */

export default Hits;
