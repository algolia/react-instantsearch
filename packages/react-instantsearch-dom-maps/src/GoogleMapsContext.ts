import React from 'react';

export type GoogleMapsContextState = {
  google: typeof google;
  instance: google.maps.Map;
};

const GoogleMapsContext = React.createContext<GoogleMapsContextState>({
  google: {} as typeof google,
  instance: {} as google.maps.Map,
});

export default GoogleMapsContext;
