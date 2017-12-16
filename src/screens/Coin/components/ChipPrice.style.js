import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

export default StyleSheet.create({
  label: {
    color: THEME.CONTRAST,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  low: {
    backgroundColor: THEME.COLOR_LOW,
  },

  high: {
    backgroundColor: THEME.COLOR_HIGH,
  },

  value: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    color: THEME.WHITE,
  },
});
