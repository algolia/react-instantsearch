import React from 'react';

export type GoogleMapsContextState = {
  google: typeof google;
  instance: google.maps.Map;
}

const GoogleMapsContext = React.createContext<Partial<GoogleMapsContextState>>({});

export default GoogleMapsContext;
