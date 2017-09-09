import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
    paddingTop: THEME.OFFSET,
  },

  section: {
    marginLeft: THEME.OFFSET,
    marginRight: THEME.OFFSET,
    marginBottom: THEME.OFFSET,
  },

  title: {
    fontSize: THEME.FONT_SIZE_NORMAL,
    color: THEME.WHITE,
  },

  currentPrice: {
    fontSize: THEME.FONT_SIZE_EXTRA_LARGE,
  },

  highlight: {
    color: THEME.WHITE,
  },

  caption: {
    color: THEME.CONTRAST,
  },

  label: {
    marginLeft: THEME.UNIT / 2,
    width: THEME.UNIT * 4.4,
    fontSize: THEME.FONT_SIZE_SMALL,
  },

  left: {
    flex: 1,
  },

  right: {
    textAlign: 'right',
  },

  prices: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});
