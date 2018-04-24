import { Component } from 'react';
import PropTypes from 'prop-types';
// @TODO: Update this import when the package is correctly split:
// import { connectGeoSearch } from 'react-instantsearch-dom';
import { connectGeoSearch } from '../../react-instantsearch/connectors';

const LatLngPropType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

export class Provider extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRefinedWithMap: PropTypes.bool.isRequired,
    children: PropTypes.func.isRequired,
    position: LatLngPropType,
    currentRefinement: PropTypes.shape({
      northEast: LatLngPropType.isRequired,
      southWest: LatLngPropType.isRequired,
    }),
  };

  render() {
    const {
      hits,
      isRefinedWithMap,
      position,
      currentRefinement,
      children,
    } = this.props;

    return children({
      hits,
      isRefinedWithMap,
      position,
      currentRefinement,
    });
  }
}

export default connectGeoSearch(Provider);
