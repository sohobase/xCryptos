import { StackNavigator } from 'react-navigation';
import { CurrenciesScreen, CurrencyScreen, MainScreen } from './src/screens';

const App = StackNavigator({
  Home: { screen: MainScreen },
  Currencies: { screen: CurrenciesScreen },
  Currency: { screen: CurrencyScreen },
});

export default App;
