import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Filters from './Filters';
import Price from './Price';
import Categories from './Categories';
import Type from './Type';

const App = StackNavigator({
  Home: { screen: Home },
  Filters: { screen: Filters },
  Categories: { screen: Categories },
  Type: { screen: Type },
  Price: { screen: Price },
});

export default App;
