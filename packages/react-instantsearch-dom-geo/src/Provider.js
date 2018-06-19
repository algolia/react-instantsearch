import { Component } from 'react';
import PropTypes from 'prop-types';
import { connectGeoSearch } from 'react-instantsearch-dom';
import { LatLngPropType, BoundingBoxPropType } from './propTypes';

export class Provider extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRefinedWithMap: PropTypes.bool.isRequired,
    children: PropTypes.func.isRequired,
    position: LatLngPropType,
    currentRefinement: BoundingBoxPropType,
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
