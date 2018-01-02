import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  connectSearchBox,
  connectInfiniteHits,
  connectHits,
} from 'react-instantsearch/connectors';
import { InstantSearch, Configure, Index } from 'react-instantsearch/native';
import Highlight from './Highlight';
import { omit } from 'lodash';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  algoliaLogo: {
    width: 40,
    height: 40,
    margin: 10,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bestResults: {
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
  searchBox: {
    color: 'black',
    height: 50,
    width: 300,
    alignSelf: 'center',
  },
  hitsContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  hits: {
    height: 30,
    padding: 10,
    marginBottom: 10,
  },
  hitsPicture: { width: 40, height: 40 },
  hitsText: {
    alignSelf: 'center',
    paddingLeft: 5,
    flex: 1,
    flexWrap: 'wrap',
  },
  hitsSeparator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySuggestions: false,
      searchState: {},
      query: '',
    };
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.removeSuggestions = this.removeSuggestions.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }
  displaySuggestions() {
    this.setState({ displaySuggestions: true });
  }

  removeSuggestions() {
    this.setState({ displaySuggestions: false });
  }

  setQuery(query) {
    const searchState = omit(this.state.searchState, ['query']);
    this.setState({
      query,
      searchState,
      displaySuggestions: false,
    });
  }

  onSearchStateChange(searchState) {
    this.setState({ searchState });
  }

  render() {
    const suggestions = this.state.displaySuggestions ? (
      <SuggestionsHits onPressItem={this.setQuery} />
    ) : null;

    const results = this.state.displaySuggestions ? (
      <ResultsHits removeSuggestions={this.removeSuggestions} />
    ) : (
      <ResultsInfiniteHits removeSuggestions={this.removeSuggestions} />
    );
    return (
      <View style={styles.container}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="instant_search"
          onSearchStateChange={this.onSearchStateChange}
          searchState={this.state.searchState}
        >
          <ConnectedSearchBox
            displaySuggestions={this.displaySuggestions}
            defaultRefinement={this.state.query}
          />
          <Index indexName="instantsearch_query_suggestions">
            <Configure hitsPerPage={5} />
            {suggestions}
          </Index>
          <Index indexName="instant_search">
            <Configure hitsPerPage={15} />
            <Text style={styles.bestResults}>Best results</Text>
            <View>{results}</View>
          </Index>
        </InstantSearch>
      </View>
    );
  }
}

class SearchBox extends Component {
  render() {
    return (
      <View style={styles.searchBoxContainer}>
        <Image
          source={{
            uri:
              'https://d13yacurqjgara.cloudfront.net/users/1090953/avatars/small/3a0f064859092a0e82bedddcee24a4a8.png?148154278',
          }}
          style={styles.algoliaLogo}
        />
        <TextInput
          style={styles.searchBox}
          onChangeText={text => this.props.refine(text)}
          value={this.props.currentRefinement}
          placeholder={'Search a product...'}
          placeholderTextColor={'black'}
          clearButtonMode={'always'}
          underlineColorAndroid={'white'}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize={'none'}
          onFocus={this.props.displaySuggestions}
        />
      </View>
    );
  }
}

const ConnectedSearchBox = connectSearchBox(SearchBox);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string,
  displaySuggestions: PropTypes.func,
  refine: PropTypes.func,
};

const HitsList = ({ hits, removeSuggestions, onEndReached }) => (
  <FlatList
    renderItem={({ item }) => (
      <View style={styles.hitsContainer}>
        <Image
          source={{
            uri: `https://res.cloudinary.com/hilnmyskv/image/fetch/h_300,q_100,f_auto/${item.image}`,
          }}
          style={styles.hitsPicture}
        />
        <Text style={styles.hitsText}>
          <Highlight
            attributeName="name"
            hit={item}
            highlightProperty="_highlightResult"
          />
        </Text>
      </View>
    )}
    data={hits}
    keyExtractor={item => item.objectID}
    onEndReached={onEndReached}
    onScroll={removeSuggestions}
    ItemSeparatorComponent={() => <View style={hits.hitsSeparator} />}
  />
);

HitsList.propTypes = {
  hits: PropTypes.array,
  removeSuggestions: PropTypes.func,
  onEndReached: PropTypes.func,
};

const ResultsInfiniteHits = connectInfiniteHits(
  ({ hits, hasMore, refine, removeSuggestions }) => {
    const onEndReached = function() {
      if (hasMore) {
        refine();
      }
    };
    return (
      <HitsList
        removeSuggestions={removeSuggestions}
        hits={hits}
        onEndReached={onEndReached}
      />
    );
  }
);

const ResultsHits = connectHits(({ hits, removeSuggestions }) => (
  <HitsList removeSuggestions={removeSuggestions} hits={hits} />
));

const SuggestionsHits = connectHits(({ hits, onPressItem }) => (
  <FlatList
    renderItem={({ item }) => (
      <TouchableHighlight onPress={() => onPressItem(item.query)}>
        <View style={styles.hits}>
          <Highlight
            attributeName="query"
            hit={item}
            highlightProperty="_highlightResult"
            inverted
          />
        </View>
      </TouchableHighlight>
    )}
    keyExtractor={item => item.objectID}
    data={hits}
  />
));
