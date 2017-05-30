import React from 'react';
import { Button } from 'react-native';
import { connectStats } from 'react-instantsearch/connectors';
import { Actions } from 'react-native-router-flux';

export default connectStats(
  ({ nbHits, processingTimeMS, searchState, onSearchStateChange }) => (
    <Button
      title={`${nbHits} hits found in ${processingTimeMS}ms`}
      onPress={() =>
        Actions.Home({
          searchState,
          onSearchStateChange,
        })}
      color="white"
    />
  )
);
