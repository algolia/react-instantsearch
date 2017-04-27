/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Image,
  Button,
} from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectSearchBox,
  connectInfiniteHits,
  connectRefinementList,
} from 'react-instantsearch/connectors';

const styles = StyleSheet.create({
  maincontainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default class extends Component {
  static displayName = 'React Native example';

  constructor(props) {
    super(props);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.state = { searchState: {} };
  }

  onSearchStateChange(nextState) {
    this.setState({ searchState: { ...this.state.searchState, ...nextState } });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log('this.state.searchState', this.state.searchState);

    return (
      <View style={styles.maincontainer}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="ikea"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <ConnectedSearchBox />
          <Button
            onPress={() =>
              navigate('Filters', {
                onSearchStateChange: this.onSearchStateChange,
                searchState: this.state.searchState,
              })}
            title="Chat with Lucy"
          />
          <ConnectedHits />
          <ConnectedRefinementList attributeName="category" />
        </InstantSearch>
      </View>
    );
  }
}

class SearchBox extends Component {
  render() {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => this.props.refine(text)}
        value={this.props.currentRefinement}
      />
    );
  }
}

SearchBox.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string,
};

const ConnectedSearchBox = connectSearchBox(SearchBox);

class Hits extends Component {
  onEndReached() {
    if (this.props.hasMore) {
      this.props.refine();
    }
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const hits = this.props.hits.length > 0
      ? <View>
          <ListView
            dataSource={ds.cloneWithRows(this.props.hits)}
            renderRow={this._renderRow}
            onEndReached={this.onEndReached.bind(this)}
          />
        </View>
      : null;
    return hits;
  }

  _renderRow = hit => (
    <View style={styles.item}>
      <Image style={{ height: 100, width: 100 }} source={{ uri: hit.image }} />
      <Text>
        {hit.name}
      </Text>
    </View>
  );
}

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

const ConnectedHits = connectInfiniteHits(Hits);

const ConnectedRefinementList = connectRefinementList(() => null);
