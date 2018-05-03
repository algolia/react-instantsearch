import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createHTMLMarker from './utils/createHTMLMarker';
import { LatLngPropType } from './propTypes';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

class Marker extends Component {
  static propTypes = {
    hit: PropTypes.shape({
      _geoloc: LatLngPropType.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    options: PropTypes.object,
  };

  static contextTypes = {
    [GOOGLE_MAPS_CONTEXT]: PropTypes.shape({
      google: PropTypes.object,
      instance: PropTypes.object,
    }),
  };

  static defaultProps = {
    options: {},
  };

  state = {
    marker: null,
  };

  componentDidMount() {
    const { hit, options } = this.props;
    const { google, instance } = this.context[GOOGLE_MAPS_CONTEXT];
    // Not the best way to create the reference of the HTMLMarker
    // but since the Google object is required didn't find another
    // solution. Ideas?
    const HTMLMarker = createHTMLMarker(google);

    const marker = new HTMLMarker({
      map: instance,
      position: hit._geoloc,
      ...options,
    });

    this.setState(() => ({
      marker,
    }));
  }

  componentWillUnmount() {
    const { marker } = this.state;

    if (marker) {
      marker.setMap(null);
    }
  }

  render() {
    const { children } = this.props;
    const { marker } = this.state;

    if (!marker) {
      return null;
    }

    return ReactDOM.createPortal(children, marker.element);
  }
}

export default Marker;
