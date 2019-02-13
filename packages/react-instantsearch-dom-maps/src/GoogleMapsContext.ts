import React from 'react';

export type GoogleMapsContextProps = {
  google: typeof google;
  instance: google.maps.Map;
}

const GoogleMapsContext = React.createContext<Partial<GoogleMapsContextProps>>({});

export default GoogleMapsContext;
