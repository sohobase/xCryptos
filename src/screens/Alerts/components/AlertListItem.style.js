import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

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
    fontSize: THEME.FONT.SIZE.NORMAL,
  },

  price: {
    fontSize: THEME.FONT.SIZE.LARGE,
  },

  label: {
    color: THEME.COLOR_SECONDARY,
    fontSize: THEME.FONT.SIZE.SMALL,
  },

});
