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
  Platform,
  TouchableHighlight,
} from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import { connectRefinementList } from 'react-instantsearch/connectors';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#162331',
    paddingTop: 25,
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    minHeight: 30,
    padding: 10,
  },
  itemRefined: {
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    backgroundColor: '#162331',
  },
  searchBox: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    ...Platform.select({
      ios: {
        borderRadius: 5,
      },
      android: {},
    }),
  },
});

class Filters extends Component {
  static displayName = 'React Native example';
  static navigationOptions = {
    title: 'AEKI',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#162331',
    },
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center',
    },
  };
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
    return (
      <View style={styles.mainContainer}>
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

Filters.propTypes = {
  navigation: PropTypes.object,
};

export default Filters;

class RefinementList extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const { items, searchForItems } = this.props;
    console.log('items', items);
    const facets = items.length > 0
      ? <ListView
          dataSource={ds.cloneWithRows(items)}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          keyboardShouldPersistTaps={'always'}
          style={styles.mainContainer}
        />
      : null;
    return (
      <View style={styles.searchBoxContainer}>
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
    const icon = refinement.isRefined
      ? <Icon name="check" color="#000" />
      : null;
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.saveQuery('');
          this.props.refine(refinement.value);
        }}
      >
        <View style={styles.item}>
          <Text style={refinement.isRefined ? styles.itemRefined : {}}>
            {refinement.label} ({refinement.count})
          </Text>
          {icon}
        </View>
      </TouchableHighlight>
    );
  };

  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
      }}
    />
  );
}

RefinementList.propTypes = {
  query: PropTypes.string,
  saveQuery: PropTypes.func,
  searchForItems: PropTypes.func,
  refine: PropTypes.func,
  items: PropTypes.array,
};

const ConnectedRefinementList = connectRefinementList(RefinementList);

class SearchBox extends Component {
  render() {
    return (
      <TextInput
        style={styles.searchBox}
        onChangeText={text => {
          this.props.saveQuery(text);
          this.props.searchForItems(text);
        }}
        placeholder={'Search a category...'}
        clearButtonMode={'always'}
        underlineColorAndroid={'white'}
        spellCheck={false}
      />
    );
  }
}

SearchBox.propTypes = {
  currentRefinement: PropTypes.string,
  saveQuery: PropTypes.func,
  searchForItems: PropTypes.func,
};
