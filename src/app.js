import { StackNavigator } from 'react-navigation';
import {
  AlertsScreen,
  CoinsScreen,
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
    Coins: { screen: CoinsScreen, navigationOptions },
    Settings: { screen: SettingsScreen, navigationOptions },
    Alerts: { screen: AlertsScreen, navigationOptions },
  },
  stackOptions,
);

export default App;
