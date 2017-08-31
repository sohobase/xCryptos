import { DrawerNavigator, StackNavigator } from 'react-navigation';
import {
  CurrenciesScreen,
  CurrencyScreen,
  MainScreen,
  SettingsScreen,
} from './screens';
import styles from './app.style';

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: styles.header,
  headerTintColor: 'white',
};

const App = DrawerNavigator({
  Main: {
    screen: StackNavigator({
      Main: { screen: MainScreen, navigationOptions },
      Currencies: { screen: CurrenciesScreen, navigationOptions },
      Currency: { screen: CurrencyScreen, navigationOptions },
    }),
  },
  Settings: {
    screen: StackNavigator({
      Settings: { screen: SettingsScreen, navigationOptions },
    }),
  },
});

export default App;
