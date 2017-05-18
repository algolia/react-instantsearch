/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectRefinementList,
  connectSearchBox,
  connectRange,
  connectMenu,
} from 'react-instantsearch/connectors';
import Stats from './Stats';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
          <View style={{ marginTop: 50 }}>
            <ConnectedRange attributeName="price" />
            <Stats navigation={this.props.navigation} />
          </View>
          <VirtualRefinementList attributeName="type" />
          <VirtualMenu attributeName="category" />
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

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValues: {
        min: Math.trunc(this.props.min),
        max: Math.trunc(this.props.max),
      },
    };
  }
  componentWillReceiveProps(sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max,
        },
      });
    }
  }

  sliderOneValuesChange = sliderState => {
    this.setState({
      currentValues: { min: sliderState[0], max: sliderState[1] },
    });
  };

  sliderOneValuesChangeFinish = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState[0] ||
      this.props.currentRefinement.max !== sliderState[1]
    ) {
      this.props.refine({
        min: sliderState[0],
        max: sliderState[1],
      });
    }
  };

  render() {
    const slider = this.props.min
      ? <MultiSlider
          values={[this.state.currentValues.min, this.state.currentValues.max]}
          min={Math.trunc(this.props.min)}
          max={Math.trunc(this.props.max)}
          sliderLength={280}
          onValuesChange={this.sliderOneValuesChange}
          onValuesChangeFinish={this.sliderOneValuesChangeFinish}
        />
      : null;
    return (
      <View style={styles.container}>
        <Text>{Math.trunc(this.state.currentValues.min)}</Text>
        {slider}
        <Text>{Math.trunc(this.state.currentValues.max)}</Text>
      </View>
    );
  }
}

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualMenu = connectMenu(() => null);
const ConnectedRange = connectRange(Range);
