import React from 'react';

type GeoSearchContextState = {
  isRefineOnMapMove: boolean;
  hasMapMoveSinceLastRefine: boolean;
  toggleRefineOnMapMove: () => void;
  setMapMoveSinceLastRefine: () => void;
  refineWithInstance: () => void;
}

const GeoSearchContext = React.createContext<Partial<GeoSearchContextState>>({});

export default GeoSearchContext;
