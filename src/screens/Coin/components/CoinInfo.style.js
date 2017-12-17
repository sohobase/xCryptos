import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  price: {
    fontSize: THEME.UNIT * 5.6,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    color: THEME.WHITE,
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
