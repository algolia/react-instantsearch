import React from 'react';
import { Button } from 'react-native';
import { connectStats } from 'react-instantsearch/connectors';

export default connectStats(({ nbHits, processingTimeMS, navigation }) => {
  return (
    <Button
      title={`${nbHits} hits found in ${processingTimeMS}ms`}
      onPress={() => {
        navigation.navigate('Home', {
          onSearchStateChange: navigation.state.params.onSearchStateChange,
          searchState: navigation.state.params.searchState,
        });
      }}
    />
  );
});
