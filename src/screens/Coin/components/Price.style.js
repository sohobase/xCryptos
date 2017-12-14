import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  symbol: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    marginLeft: THEME.UNIT * 3,
  },

  price: {
    fontSize: THEME.UNIT * 5.6,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    color: THEME.WHITE,
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  label: {
    color: THEME.CONTRAST,
  },

  chip: {
    left: THEME.UNIT * -1,
  },

  bold: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },
});
