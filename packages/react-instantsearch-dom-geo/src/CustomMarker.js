import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createHTMLMarker from './elements/createHTMLMarker';
import { LatLngPropType } from './propTypes';
import { GOOGLE_MAPS_CONTEXT } from './GoogleMaps';

class CustomMarker extends Component {
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

  static isReact16() {
    return typeof ReactDOM.createPortal === 'function';
  }

  state = {
    marker: null,
  };

  componentDidMount() {
    const { hit, options } = this.props;
    const { google, instance } = this.context[GOOGLE_MAPS_CONTEXT];
    // Not the best way to create the reference of the CustomMarker
    // but since the Google object is required didn't find another
    // solution. Ideas?
    const Marker = createHTMLMarker(google);

    const marker = new Marker({
      map: instance,
      position: hit._geoloc,
      ...options,
    });

    this.setState(() => ({
      marker,
    }));
  }

  componentDidUpdate() {
    const { children } = this.props;
    const { marker } = this.state;

    if (marker) {
      if (!CustomMarker.isReact16()) {
        ReactDOM.unstable_renderSubtreeIntoContainer(
          this,
          children,
          marker.element
        );
      }
    }
  }

  componentWillUnmount() {
    const { marker } = this.state;

    if (marker) {
      if (!CustomMarker.isReact16()) {
        ReactDOM.unmountComponentAtNode(marker.element);
      }

      marker.setMap(null);
    }
  }

  render() {
    const { children } = this.props;
    const { marker } = this.state;

    if (!marker || !CustomMarker.isReact16()) {
      return null;
    }

    return ReactDOM.createPortal(children, marker.element);
  }
}

export default CustomMarker;
