import { StackNavigator } from 'react-navigation';
import {
  AlertsScreen,
  CoinsScreen,
  CoinScreen,
  MainScreen,
  SettingsScreen,
} from './screens';
import { THEME } from './config';
import styles from './app.style';

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: styles.header,
  headerTitleStyle: styles.title,
  headerTintColor: THEME.WHITE,
};

const stackOptions = {
  initialRouteName: 'Main',
};

const App = StackNavigator(
  {
    Main: { screen: MainScreen, navigationOptions },
    Currency: { screen: CoinScreen, navigationOptions },
    Settings: { screen: SettingsScreen, navigationOptions },
    Currencies: { screen: CoinsScreen, navigationOptions },
    Alerts: { screen: AlertsScreen, navigationOptions },
  },
  stackOptions,
);

export default App;
