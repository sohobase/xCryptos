import { DrawerNavigator, StackNavigator } from 'react-navigation';
import {
  AboutScreen,
  AlertsScreen,
  CoinsScreen,
  CoinScreen,
  Drawer,
  MainScreen,
} from './screens';
import { THEME } from './config';
import styles from './app.style';

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: styles.header,
  headerTitleStyle: styles.title,
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
      Currencies: { screen: CoinsScreen, navigationOptions },
      Currency: { screen: CoinScreen, navigationOptions },
      Alerts: { screen: AlertsScreen, navigationOptions },
    }),
  },
  About: {
    screen: StackNavigator({
      About: { screen: AboutScreen, navigationOptions },
    }),
  },
}, drawerOptions);

export default App;
