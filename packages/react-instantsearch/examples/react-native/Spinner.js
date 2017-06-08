import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { createConnector } from 'react-instantsearch';

const { width } = Dimensions.get('window');

export default createConnector({
  displayName: 'ConditionalQuery',
  getProvidedProps(props, searchState, results) {
    return { loading: results.searching };
  },
})(({ loading }) => (
  <View
    style={{
      position: 'absolute',
      left: width - 60,
      zIndex: 2,
    }}
  >
    <ActivityIndicator animating={loading} />
  </View>
));
