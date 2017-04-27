import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Filters from './Filters';

const App = StackNavigator({
  Home: { screen: Home },
  Filters: { screen: Filters },
});

export default App;
