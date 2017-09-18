import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
    borderRadius: THEME.OFFSET * 2,
    display: 'flex',
    padding: THEME.UNIT,
  },

  disabled: {
    backgroundColor: THEME.FONT_PRIMARY_COLOR,
    opacity: 0.35,
  },

  caption: {
    color: THEME.WHITE,
    fontSize: THEME.FONT_SIZE_NORMAL,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },
});
