import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  CHART_HEIGHT, FONT, UNIT, WHITE,
} = THEME;

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  price: {
    fontSize: UNIT * 5.6,
    fontWeight: FONT.WEIGHT.LIGHT,
    color: WHITE,
    backgroundColor: 'transparent',
  },

  prices: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
