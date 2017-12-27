import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: THEME.ACCENT,
    borderRadius: THEME.OFFSET * 2,
    display: 'flex',
    paddingBottom: THEME.UNIT,
    paddingLeft: THEME.OFFSET,
    paddingRight: THEME.OFFSET,
    paddingTop: THEME.UNIT,
  },

  disabled: {
    backgroundColor: THEME.FONT_PRIMARY_COLOR,
    opacity: 0.35,
  },

  caption: {
    color: THEME.WHITE,
    fontSize: THEME.FONT.SIZE.NORMAL,
    fontWeight: THEME.FONT.WEIGHT.BOLD,
  },
});
