/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Image,
  StatusBar,
  Button,
  Platform,
} from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectSearchBox,
  connectInfiniteHits,
  connectRefinementList,
  connectStats,
  connectMenu,
  connectSortBy,
  connectRange,
} from 'react-instantsearch/connectors';
import StarRating from 'react-native-star-rating';
import IosIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  maincontainer: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  sortBy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortByArrow: {
    paddingLeft: 3,
  },
  header: {
    backgroundColor: '#162331',
    paddingTop: 25,
    flexDirection: 'column',
  },
  searchBoxContainer: {
    backgroundColor: '#162331',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    flexGrow: 1,
    ...Platform.select({
      ios: {
        borderRadius: 5,
      },
      android: {},
    }),
  },
  itemContent: {
    paddingLeft: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  itemType: {
    fontSize: 13,
    fontWeight: '200',
    paddingBottom: 5,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  starRating: { alignSelf: 'flex-start' },
});
class Home extends Component {
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
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.state = { searchState: {} };
  }

  onSearchStateChange(nextState) {
    this.setState({ searchState: { ...this.state.searchState, ...nextState } });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.maincontainer}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="ikea"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <View style={styles.searchBoxContainer}>
            <ConnectedSearchBox />
          </View>

          <View style={styles.options}>
            <ConnectedStats />
            <ConnectedSortBy
              items={[
                { value: 'ikea', label: 'Featured' },
                { value: 'ikea_price_desc', label: 'Price desc' },
                { value: 'ikea_price_asc', label: 'Price asc' },
              ]}
              defaultRefinement={'ikea'}
            />
            <Button
              onPress={() =>
                navigate('Filters', {
                  onSearchStateChange: this.onSearchStateChange,
                  searchState: this.state.searchState,
                })}
              title="Filters"
            />
          </View>
          <ConnectedHits />
          <VirtualRefinementList attributeName="type" />
          <VirtualRange attributeName="price" />
          <VirtualMenu attributeName="category" />
          <VirtualRange attributeName="rating" />
        </InstantSearch>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;

class SearchBox extends Component {
  render() {
    return (
      <TextInput
        style={styles.searchBox}
        onChangeText={text => this.props.refine(text)}
        value={this.props.currentRefinement}
        placeholder={'Search a product...'}
        clearButtonMode={'always'}
        underlineColorAndroid={'white'}
        spellCheck={false}
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
            renderSeparator={this.renderSeparator}
            onEndReached={this.onEndReached.bind(this)}
          />
        </View>
      : null;
    return hits;
  }

  _renderRow = hit => (
    <View style={styles.item}>
      <Image style={{ height: 100, width: 100 }} source={{ uri: hit.image }} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>
          {hit.name}
        </Text>
        <Text style={styles.itemType}>
          {hit.type}
        </Text>
        <Text style={styles.itemPrice}>
          ${hit.price}
        </Text>
        <View style={styles.starRating}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={hit.rating}
            starSize={15}
            starColor="#FBAE00"
          />
        </View>
      </View>

    </View>
  );

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
      }}
    />
  );
}

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

const ConnectedHits = connectInfiniteHits(Hits);
const ConnectedStats = connectStats(({ nbHits, processingTimeMS }) => (
  <Text>{nbHits} hits found in {processingTimeMS}ms</Text>
));

const ConnectedSortBy = connectSortBy(
  ({ refine, items, currentRefinement }) => {
    const icon = Platform.OS === 'ios'
      ? <IosIcon
          size={13}
          name="ios-arrow-down"
          color="#000"
          style={styles.sortByArrow}
        />
      : <MaterialIcon
          size={20}
          name="arrow-drop-down"
          color="#000"
          style={styles.sortByArrow}
        />;
    return (
      <View style={styles.sortBy}>
        <ModalDropdown
          animated={false}
          defaultValue={
            items.find(item => item.value === currentRefinement).label
          }
          onSelect={(index, value) =>
            refine(items.find(item => item.label === value).value)}
          options={items.map(item => item.label)}
          renderRow={item => {
            const itemValue = items.find(i => i.label === item).value;
            return (
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: itemValue === currentRefinement ? 'bold' : '200',
                  padding: 10,
                }}
              >
                {item}
              </Text>
            );
          }}
          dropdownStyle={{
            width: 200,
            height: 110,
          }}
          textStyle={{ fontSize: 15 }}
        />
        {icon}
      </View>
    );
  }
);

const VirtualRange = connectRange(() => null);
const VirtualRefinementList = connectRefinementList(() => null);
const VirtualMenu = connectMenu(() => null);
