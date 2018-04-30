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

export class Control extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    enableRefineOnMapMove: PropTypes.bool,
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

  static defaultProps = {
    enableRefineOnMapMove: true,
  };

  getStateContext() {
    return this.context[STATE_CONTEXT];
  }

  getGoogleMapsContext() {
    return this.context[GOOGLE_MAPS_CONTEXT];
  }

  componentDidMount() {
    const { enableRefineOnMapMove } = this.props;
    const { isRefineOnMapMove, toggleRefineOnMapMove } = this.getStateContext();

    if (!enableRefineOnMapMove && isRefineOnMapMove) {
      toggleRefineOnMapMove();
    }
  }

  render() {
    const { translate } = this.props;
    const { refineWithBoundingBox } = this.getGoogleMapsContext();
    const {
      isRefineOnMapMove,
      hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove,
    } = this.getStateContext();

    return (
      <div className={cx('control')}>
        {isRefineOnMapMove || !hasMapMoveSinceLastRefine ? (
          <label className="ais-GeoSearch-label">
            <input
              className="ais-GeoSearch-input"
              type="checkbox"
              checked={isRefineOnMapMove}
              onChange={toggleRefineOnMapMove}
            />
            {translate('control')}
          </label>
        ) : (
          <button
            className="ais-GeoSearch-redo"
            onClick={refineWithBoundingBox}
          >
            {translate('redo')}
          </button>
        )}
      </div>
    );
  }
}

export default translatable({
  control: 'Search as I move the map',
  redo: 'Redo search here',
})(Control);
