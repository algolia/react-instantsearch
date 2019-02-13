import React from 'react';
import PropTypes from 'prop-types';

const GeoSearchContext = React.createContext();

GeoSearchContext.Provider.propTypes = {
  isRefineOnMapMove: PropTypes.bool,
  hasMapMoveSinceLastRefine: PropTypes.bool,
  toggleRefineOnMapMove: PropTypes.func,
  setMapMoveSinceLastRefine: PropTypes.func,
  refineWithInstance: PropTypes.func,
};

export default GeoSearchContext;
