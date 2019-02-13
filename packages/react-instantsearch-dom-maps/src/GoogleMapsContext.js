import React from 'react';
import PropTypes from 'prop-types';

const GoogleMapsContext = React.createContext();

GoogleMapsContext.Provider.propTypes = {
  google: PropTypes.object,
  instance: PropTypes.object,
};

export default GoogleMapsContext;
