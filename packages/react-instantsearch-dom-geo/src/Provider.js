import { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';

export const STATE_CONTEXT = '__ais_geo_search__state__';

class Provider extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRefineOnMapMove: PropTypes.bool.isRequired,
    hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    toggleRefineOnMapMove: PropTypes.func.isRequired,
    setMapMoveSinceLastRefine: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    position: LatLngPropType,
    currentRefinement: BoundingBoxPropType,
  };

  static childContextTypes = {
    [STATE_CONTEXT]: PropTypes.shape({
      isRefineOnMapMove: PropTypes.bool.isRequired,
      hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
      toggleRefineOnMapMove: PropTypes.func.isRequired,
      setMapMoveSinceLastRefine: PropTypes.func.isRequired,
      refineWithInstance: PropTypes.func.isRequired,
    }).isRequired,
  };

  isPendingRefine = false;

  getChildContext() {
    const {
      isRefineOnMapMove,
      hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove,
      setMapMoveSinceLastRefine,
    } = this.props;

    return {
      [STATE_CONTEXT]: {
        refineWithInstance: this.refineWithInstance,
        toggleRefineOnMapMove,
        setMapMoveSinceLastRefine,
        isRefineOnMapMove,
        hasMapMoveSinceLastRefine,
      },
    };
  }

  createBoundingBoxFromHits(hits) {
    const { google } = this.props;

    const latLngBounds = hits.reduce(
      (acc, hit) => acc.extend(hit._geoloc),
      new google.maps.LatLngBounds()
    );

    return {
      northEast: latLngBounds.getNorthEast().toJSON(),
      southWest: latLngBounds.getSouthWest().toJSON(),
    };
  }

  refineWithInstance = instance => {
    const { refine, setMapMoveSinceLastRefine } = this.props;

    const bounds = instance.getBounds();

    refine({
      northEast: bounds.getNorthEast().toJSON(),
      southWest: bounds.getSouthWest().toJSON(),
    });

    setMapMoveSinceLastRefine(false);
  };

  onChange = () => {
    const { isRefineOnMapMove, setMapMoveSinceLastRefine } = this.props;

    setMapMoveSinceLastRefine(true);

    if (isRefineOnMapMove) {
      this.isPendingRefine = true;
    }
  };

  onIdle = ({ instance }) => {
    if (this.isPendingRefine) {
      this.isPendingRefine = false;

      this.refineWithInstance(instance);
    }
  };

  shouldUpdate = () => {
    const { hasMapMoveSinceLastRefine } = this.props;

    return !this.isPendingRefine && !hasMapMoveSinceLastRefine;
  };

  render() {
    const { hits, currentRefinement, children } = this.props;

    const boundingBoxPadding = !currentRefinement ? undefined : 0;
    const boundingBox =
      !currentRefinement && Boolean(hits.length)
        ? this.createBoundingBoxFromHits(hits)
        : currentRefinement;

    return children({
      onChange: this.onChange,
      onIdle: this.onIdle,
      shouldUpdate: this.shouldUpdate,
      boundingBox,
      boundingBoxPadding,
    });
  }
}

export default Provider;
