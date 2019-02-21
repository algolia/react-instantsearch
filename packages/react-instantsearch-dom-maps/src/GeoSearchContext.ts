import React from 'react';

type GeoSearchContextState = {
  isRefineOnMapMove: boolean;
  hasMapMoveSinceLastRefine: boolean;
  toggleRefineOnMapMove: () => void;
  setMapMoveSinceLastRefine: (value: boolean) => void;
  refineWithInstance: (value: google.maps.Map) => void;
};

const GeoSearchContext = React.createContext<GeoSearchContextState>({
  isRefineOnMapMove: true,
  hasMapMoveSinceLastRefine: false,
  toggleRefineOnMapMove: () => undefined,
  setMapMoveSinceLastRefine: () => undefined,
  refineWithInstance: () => undefined,
});

export default GeoSearchContext;
