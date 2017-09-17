import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    padding: THEME.UNIT,
    borderRadius: THEME.OFFSET * 2,
  },

  caption: {
    fontSize: THEME.FONT_SIZE_NORMAL,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },

  small: {
    fontSize: THEME.FONT_SIZE_SMALL,
  },
});
