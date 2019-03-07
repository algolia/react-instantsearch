import React from 'react';
import GoogleMapsContext from './GoogleMapsContext';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export interface WithGoogleMapsProps {
  google: typeof google;
  googleMapsInstance: google.maps.Map;
}

const withGoogleMaps = <Props extends WithGoogleMapsProps>(
  Wrapped: React.ComponentType<Props>
) => {
  const WithGoogleMaps: React.FC<
    Subtract<Props, WithGoogleMapsProps>
  > = props => (
    <GoogleMapsContext.Consumer>
      {({ google, instance }) => (
        <Wrapped
          // @TODO: remove the cast once TypeScript fixes the issue
          // https://github.com/Microsoft/TypeScript/issues/28938
          {...props as Props}
          google={google}
          googleMapsInstance={instance}
        />
      )}
    </GoogleMapsContext.Consumer>
  );

  return WithGoogleMaps;
};

export default withGoogleMaps;
