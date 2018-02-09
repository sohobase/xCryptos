import { NativeModules } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  AlertsScreen,
  CoinsScreen,
  MainScreen,
  SettingsScreen,
} from './screens';

const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

const navigationOptions = {
  headerBackTitle: ' ',
  headerTitleStyle: {
    alignSelf: 'center',
  },
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
