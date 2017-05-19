/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectRefinementList,
  connectSearchBox,
  connectRange,
  connectMenu,
  connectCurrentRefinements,
} from 'react-instantsearch/connectors';
import Stats from './Stats';
import { isEmpty } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
});

const window = Dimensions.get('window');

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
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.state = {
      searchState: props.navigation.state.params.searchState,
    };
  }
  onSearchStateChange(nextState) {
    const searchState = { ...this.state.searchState, ...nextState };
    this.setState({ searchState });
    this.props.navigation.state.params.onSearchStateChange(searchState);
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
          <View
            style={{
              backgroundColor: '#162331',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  margin: 5,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                  alignSelf: 'center',
                }}
              >
                RATINGS
              </Text>
              <ConnectedCurrentRefinements />
            </View>
            <ConnectedRating attributeName="rating" />
            <View
              style={{
                position: 'absolute',
                height: 100,
                left: 0,
                top: window.height - 100,
                width: window.width,
              }}
            >
              <Stats navigation={this.props.navigation} />
            </View>
          </View>
          <VirtualRefinementList attributeName="type" />
          <VirtualMenu attributeName="category" />
          <VirtualRange attributeName="price" />
          <VirtualSearchBox />
        </InstantSearch>
      </View>
    );
  }
}

Filters.propTypes = {
  navigation: PropTypes.object,
};

export default Filters;

class Rating extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    count: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        count: PropTypes.number,
      })
    ),
    canRefine: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    canRefine: PropTypes.func,
  };

  buildItem({ max, lowerBound, count, isLastSelectableItem }) {
    const disabled = !count;
    const isCurrentMinLower = this.props.currentRefinement.min < lowerBound;
    const selected =
      (isLastSelectableItem && isCurrentMinLower) ||
      (!disabled &&
        lowerBound === this.props.currentRefinement.min &&
        max === this.props.currentRefinement.max);
    return { max, min: lowerBound, count, selected };
  }

  _renderRow = ({ max, min, count, selected }) => {
    return (
      <TouchableHighlight
        style={{ backgroundColor: selected ? '#162331' : 'white' }}
        onPress={() => {
          return selected
            ? this.props.refine({ min: this.props.min, max: this.props.max })
            : this.props.refine({ min, max });
        }}
      >
        <View
          pointerEvents="none"
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        >
          <StarRating
            disabled={true}
            maxStars={max}
            rating={min}
            starSize={30}
            starColor="#FBAE00"
            emptyStarColor={selected ? 'white' : 'gray'}
          />
          <Text style={{ color: selected ? 'white' : 'black' }}> and up! </Text>
          <Text style={{ color: selected ? 'white' : 'black' }}>({count})</Text>
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

  render() {
    const { translate, refine, min, max, count, createURL } = this.props;
    const items = [];
    for (let i = max; i >= min; i--) {
      const hasCount = !isEmpty(count.filter(item => Number(item.value) === i));
      const lastSelectableItem = count.reduce(
        (acc, item) =>
          (item.value < acc.value || (!acc.value && hasCount) ? item : acc),
        {}
      );
      const itemCount = count.reduce(
        (acc, item) => (item.value >= i && hasCount ? acc + item.count : acc),
        0
      );
      items.push(
        this.buildItem({
          lowerBound: i,
          max,
          refine,
          count: itemCount,
          translate,
          createURL,
          isLastSelectableItem: i === Number(lastSelectableItem.value),
        })
      );
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    return (
      <View>
        <ListView
          dataSource={ds.cloneWithRows(items)}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          keyboardShouldPersistTaps={'always'}
        />
      </View>
    );
  }
}

class CurrentRefinements extends React.Component {
  render() {
    const { items, refine } = this.props;
    const clear = items.find(item => item.attributeName === 'rating');
    const icon = clear
      ? <TouchableHighlight
          onPress={() => {
            return refine(clear.value);
          }}
        >
          <Icon name="times" size={20} color="white" />
        </TouchableHighlight>
      : null;
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          left: window.width - 30,
          top: 3,
        }}
      >
        {icon}
      </View>
    );
  }
}

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualMenu = connectMenu(() => null);
const VirtualRange = connectRange(() => null);
const ConnectedRating = connectRange(Rating);
const ConnectedCurrentRefinements = connectCurrentRefinements(
  CurrentRefinements
);
