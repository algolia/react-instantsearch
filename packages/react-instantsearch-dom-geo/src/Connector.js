import { Component } from 'react';
import PropTypes from 'prop-types';
// @TODO: Update this import when the package is correctly split:
// import { connectGeoSearch } from 'react-instantsearch-dom';
import { connectGeoSearch } from '../../react-instantsearch/connectors';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';

export const STATE_CONTEXT = '__ais_geo_search__state__';

export class Connector extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRefinedWithMap: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    position: LatLngPropType,
    currentRefinement: BoundingBoxPropType,
  };

  static childContextTypes = {
    [STATE_CONTEXT]: PropTypes.shape({
      isRefineOnMapMove: PropTypes.bool.isRequired,
      toggleRefineOnMapMove: PropTypes.func.isRequired,
      hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
      setMapMoveSinceLastRefine: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isRefineOnMapMove: true,
    hasMapMoveSinceLastRefine: false,
  };

  getChildContext() {
    const { isRefineOnMapMove, hasMapMoveSinceLastRefine } = this.state;

    return {
      [STATE_CONTEXT]: {
        toggleRefineOnMapMove: this.toggleRefineOnMapMove,
        setMapMoveSinceLastRefine: this.setMapMoveSinceLastRefine,
        isRefineOnMapMove,
        hasMapMoveSinceLastRefine,
      },
    };
  }

  toggleRefineOnMapMove = () =>
    this.setState(({ isRefineOnMapMove }) => ({
      isRefineOnMapMove: !isRefineOnMapMove,
    }));

  setMapMoveSinceLastRefine = next => {
    const { hasMapMoveSinceLastRefine } = this.state;

    if (hasMapMoveSinceLastRefine === next) {
      return;
    }

    this.setState(() => ({
      hasMapMoveSinceLastRefine: next,
    }));
  };

  render() {
    const {
      hits,
      isRefinedWithMap,
      position,
      currentRefinement,
      refine,
      children,
    } = this.props;

    const { isRefineOnMapMove, hasMapMoveSinceLastRefine } = this.state;

    return children({
      toggleRefineOnMapMove: this.toggleRefineOnMapMove,
      setMapMoveSinceLastRefine: this.setMapMoveSinceLastRefine,
      hits,
      isRefinedWithMap,
      isRefineOnMapMove,
      hasMapMoveSinceLastRefine,
      position,
      currentRefinement,
      refine,
    });
  }
}

export default connectGeoSearch(Connector);
