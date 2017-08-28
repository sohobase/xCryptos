import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CurrenciesScreen, CurrencyScreen, MainScreen } from './src/screens';
import { THEME } from './src/config';

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.PRIMARY,
  },
});

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: styles.header,
  headerTintColor: 'white',
};

const App = StackNavigator({
  Home: { screen: MainScreen, navigationOptions },
  Currencies: { screen: CurrenciesScreen, navigationOptions },
  Currency: { screen: CurrencyScreen, navigationOptions },
});

export default App;
