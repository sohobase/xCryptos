import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  prices: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  chart: {
    height: THEME.UNIT * 9.6,
  },
});
