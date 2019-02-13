import React from 'react';

type GeoSearchContextProps = {
  isRefineOnMapMove: boolean;
  hasMapMoveSinceLastRefine: boolean;
  toggleRefineOnMapMove: () => void;
  setMapMoveSinceLastRefine: () => void;
  refineWithInstance: () => void;
}

const GeoSearchContext = React.createContext<Partial<GeoSearchContextProps>>({});

export default GeoSearchContext;
