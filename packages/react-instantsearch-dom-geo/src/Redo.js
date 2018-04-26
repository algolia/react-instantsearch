import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @TODO: Update this import when the package is correctly split:
// import { createClassNames } from 'react-instantsearch-dom';
import createClassNames from '../../react-instantsearch/src/components/createClassNames';
// @TODO: Update this import when the package is correctly split:
// import { translatable } from 'react-instantsearch-core';
import translatable from '../../react-instantsearch/src/core/translatable';
import { STATE_CONTEXT } from './Provider';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

const cx = createClassNames('GeoSearch');

export class Redo extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
  };

  static contextTypes = {
    [STATE_CONTEXT]: PropTypes.shape({
      isRefineOnMapMove: PropTypes.bool.isRequired,
      toggleRefineOnMapMove: PropTypes.func.isRequired,
      hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
    }).isRequired,
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      refineWithBoundingBox: PropTypes.func.isRequired,
    }).isRequired,
  };

  getStateContext() {
    return this.context[STATE_CONTEXT];
  }

  getGoogleMapsContext() {
    return this.context[GOOGLE_MAPS_CONTEXT];
  }

  componentDidMount() {
    const { isRefineOnMapMove, toggleRefineOnMapMove } = this.getStateContext();

    if (isRefineOnMapMove) {
      toggleRefineOnMapMove();
    }
  }

  render() {
    const { translate } = this.props;
    const { hasMapMoveSinceLastRefine } = this.getStateContext();
    const { refineWithBoundingBox } = this.getGoogleMapsContext();

    return (
      <div className={cx('control')}>
        <button
          className={cx('redo', !hasMapMoveSinceLastRefine && 'redo--disabled')}
          disabled={!hasMapMoveSinceLastRefine}
          onClick={refineWithBoundingBox}
        >
          {translate('redo')}
        </button>
      </div>
    );
  }
}

export default translatable({
  redo: 'Redo search here',
})(Redo);
