import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
  },

  left: {
    flex: 1,
  },

  right: {
    alignItems: 'flex-end',
  },

  symbol: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_NORMAL,
  },

  price: {
    fontSize: THEME.FONT_SIZE_LARGE,
  },

  label: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

});
