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
    minHeight: 30,
  },
  itemRefined: {
    fontWeight: 'bold',
  },
});

export default class extends Component {
  static displayName = 'React Native example';
  constructor(props) {
    super(props);
    this.saveQuery = this.saveQuery.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.state = {
      searchState: props.navigation.state.params.searchState,
      query: '',
    };
  }
  onSearchStateChange(nextState) {
    const searchState = { ...this.state.searchState, ...nextState };
    this.setState({ searchState });
    this.props.navigation.state.params.onSearchStateChange(searchState);
  }
  saveQuery(text) {
    this.setState({ query: text });
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.maincontainer}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="ikea"
          onSearchStateChange={this.onSearchStateChange}
          searchState={this.state.searchState}
        >
          <ConnectedRefinementList
            attributeName="category"
            saveQuery={this.saveQuery}
            query={this.state.query}
          />
        </InstantSearch>
      </View>
    );
  }
}

class RefinementList extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const { items, refine, searchForItems } = this.props;
    const facets = items.length > 0
      ? <ListView
          dataSource={ds.cloneWithRows(items)}
          renderRow={this._renderRow}
          keyboardShouldPersistTaps={'always'}
        />
      : null;
    return (
      <View>
        <SearchBox
          saveQuery={this.props.saveQuery}
          searchForItems={searchForItems}
          currentRefinement={this.props.query}
        />
        {facets}
      </View>
    );
  }

  _renderRow = refinement => {
    return (
      <View style={styles.item}>

        <Text
          style={refinement.isRefined ? styles.itemRefined : {}}
          onPress={() => {
            this.props.saveQuery('');
            this.props.refine(refinement.value);
          }}
        >
          {refinement.label}
        </Text>

      </View>
    );
  };
}

const ConnectedRefinementList = connectRefinementList(RefinementList);

class SearchBox extends Component {
  render() {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {
          this.props.saveQuery(text);
          this.props.searchForItems(text);
        }}
        value={this.props.currentRefinement}
      />
    );
  }
}

SearchBox.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string,
};
