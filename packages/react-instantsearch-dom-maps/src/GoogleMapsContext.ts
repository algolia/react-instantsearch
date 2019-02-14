import React from 'react';

export type GoogleMapsContextState = {
  google: typeof google | null;
  instance: google.maps.Map | null;
};

const GoogleMapsContext = React.createContext<GoogleMapsContextState>({
  google: null,
  instance: null,
});

export default GoogleMapsContext;
