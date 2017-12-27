import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  price: {
    fontSize: THEME.UNIT * 5.6,
    fontWeight: THEME.FONT.WEIGHT.LIGHT,
    color: THEME.WHITE,
    backgroundColor: 'transparent',
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
