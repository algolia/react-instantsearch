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
import {
  connectMenu,
  connectRefinementList,
  connectSearchBox,
  connectRange,
} from 'react-instantsearch/connectors';
import Stats from './Stats';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
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
  constructor(props) {
    super(props);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.state = {
      searchState: props.searchState,
    };
  }
  onSearchStateChange(nextState) {
    const searchState = { ...this.state.searchState, ...nextState };
    this.setState({ searchState });
    this.props.onSearchStateChange(searchState);
  }
  render() {
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="ikea"
        onSearchStateChange={this.onSearchStateChange}
        searchState={this.state.searchState}
        style={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      >
        <ConnectedMenu attributeName="category" />
        <Stats />
        <VirtualSearchBox />
        <VirtualRefinementList attributeName="type" />
        <VirtualRange attributeName="price" />
        <VirtualRange attributeName="rating" />
      </InstantSearch>
    );
  }
}

Filters.propTypes = {
  searchState: PropTypes.object.isRequired,
  onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.saveQuery = this.saveQuery.bind(this);
    this.state = {
      query: '',
    };
  }
  saveQuery(text) {
    this.setState({ query: text });
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const { items, searchForItems } = this.props;
    const facets = this
      ? <ListView
          dataSource={ds.cloneWithRows(items)}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          keyboardShouldPersistTaps={'always'}
        />
      : null;
    return (
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          onChangeText={text => {
            this.saveQuery(text);
            searchForItems(text);
          }}
          placeholder={'Search a Type...'}
          value={this.state.query}
          clearButtonMode={'always'}
          underlineColorAndroid={'white'}
          spellCheck={false}
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
          this.saveQuery('');
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

Menu.propTypes = {
  query: PropTypes.string,
  saveQuery: PropTypes.func,
  searchForItems: PropTypes.func,
  refine: PropTypes.func,
  items: PropTypes.array,
};

const ConnectedMenu = connectMenu(Menu);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualRefinementList = connectRefinementList(() => null);
const VirtualRange = connectRange(() => null);
