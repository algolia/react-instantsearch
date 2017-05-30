import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import Filters from './Filters';
import Price from './Price';
import Categories from './Categories';
import Type from './Type';
import Rating from './Rating';
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="root"
          navigationBarStyle={{ backgroundColor: '#162331' }}
          titleStyle={{ color: 'white' }}
        >
          <Scene key="Home" component={Home} title="AEKI" initial={true} />
          <Scene key="Filters" component={Filters} title="Filters" />
          <Scene key="Categories" component={Categories} title="Categories" />
          <Scene key="Type" component={Type} title="Type" />
          <Scene key="Price" component={Price} title="Price" />
          <Scene key="Rating" component={Rating} title="Ratings" />
        </Scene>
      </Router>
    );
  }
}
