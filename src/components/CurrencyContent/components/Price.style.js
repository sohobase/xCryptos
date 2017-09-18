import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  symbol: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
    marginTop: THEME.UNIT,
  },

  price: {
    fontSize: THEME.UNIT * 5.6,
    fontWeight: THEME.FONT_WEIGHT_LIGHT,
    color: THEME.WHITE,
  },

  icon: {
    marginTop: THEME.UNIT,
    width: THEME.FONT_SIZE_EXTRA_LARGE,
    height: THEME.FONT_SIZE_EXTRA_LARGE,
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  label: {
    color: THEME.CONTRAST,
  },

  chip: {
    position: 'absolute',
    right: THEME.UNIT * -3.2,
    top: THEME.UNIT,
  },

  bold: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },

});
