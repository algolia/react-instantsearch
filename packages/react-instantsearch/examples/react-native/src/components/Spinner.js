import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { connectStateResults } from 'react-instantsearch/connectors';

const { width, height } = Dimensions.get('window');

export default connectStateResults(({ searching, props }) => (
  <View
    style={{
      position: 'absolute',
      left: width - props.left,
      bottom: height - props.bottom,
      zIndex: 2,
    }}
  >
    <ActivityIndicator animating={searching} />
  </View>
));
