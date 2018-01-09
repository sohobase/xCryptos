import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { FONT, UNIT, OFFSET, WHITE } = THEME;

export default StyleSheet.create({
  container: {
    paddingHorizontal: OFFSET,
  },

  logo: {
    width: UNIT * 3.6,
    resizeMode: 'contain',
    marginRight: UNIT,
  },

  amount: {
    color: WHITE,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
