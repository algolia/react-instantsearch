import { Component } from 'react';
import PropTypes from 'prop-types';
import { connectGeoSearch } from 'react-instantsearch-dom';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';

export const STATE_CONTEXT = '__ais_geo_search__state__';

export class Provider extends Component {
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
      hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
      setMapMoveSinceLastRefine: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    hasMapMoveSinceLastRefine: false,
  };

  getChildContext() {
    const { hasMapMoveSinceLastRefine } = this.state;

    return {
      [STATE_CONTEXT]: {
        setMapMoveSinceLastRefine: this.setMapMoveSinceLastRefine,
        hasMapMoveSinceLastRefine,
      },
    };
  }

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

    const { hasMapMoveSinceLastRefine } = this.state;

    return children({
      setMapMoveSinceLastRefine: this.setMapMoveSinceLastRefine,
      hits,
      isRefinedWithMap,
      hasMapMoveSinceLastRefine,
      position,
      currentRefinement,
      refine,
    });
  }
}

export default connectGeoSearch(Provider);
