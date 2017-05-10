import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Filters from './Filters';
import Price from './Price';
import Categories from './Categories';

const App = StackNavigator({
  Home: { screen: Home },
  Filters: { screen: Filters },
  Categories: { screen: Categories },
  Price: { screen: Price },
});

export default App;
