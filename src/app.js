import { DrawerNavigator, StackNavigator } from 'react-navigation';
import {
  AboutScreen,
  CurrenciesScreen,
  CurrencyScreen,
  Drawer,
  MainScreen,
  SettingsScreen,
} from './screens';
import { THEME } from './config';
import styles from './app.style';

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: styles.header,
  headerTintColor: THEME.WHITE,
};

const drawerOptions = {
  initialRouteName: 'Main',
  contentComponent: Drawer,
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
  About: {
    screen: StackNavigator({
      About: { screen: AboutScreen, navigationOptions },
    }),
  },
}, drawerOptions);

export default App;
