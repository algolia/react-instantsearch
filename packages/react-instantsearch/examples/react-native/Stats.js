import React from 'react';
import { Button, View, Platform, Dimensions } from 'react-native';
import { connectStats } from 'react-instantsearch/connectors';
import { Actions } from 'react-native-router-flux';
import Spinner from './Spinner';

const { height, width } = Dimensions.get('window');
const styles = {
  stats: {
    position: 'absolute',
    height: 100,
    left: 0,
    ...Platform.select({
      ios: {
        top: height - 100,
      },
      android: {
        top: height - 120,
        paddingLeft: 10,
        paddingRight: 10,
      },
    }),
    width,
  },
};
export default connectStats(({ nbHits, searchState, onSearchStateChange }) => (
  <View style={styles.stats}>
    <Button
      title={`See ${nbHits} products`}
      onPress={() =>
        Actions.Home({
          searchState,
          onSearchStateChange,
        })}
      color="#162331"
    />
    <Spinner left={110} bottom={597} />
  </View>
));
