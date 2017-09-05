import { StyleSheet } from 'react-native';
import { THEME } from '../config';

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.PRIMARY,
    padding: THEME.OFFSET,
  },

  section: {
    marginBottom: THEME.OFFSET,
  },

  currency: {
    flex: 1,
  },

  title: {
    fontSize: THEME.FONT_SIZE_NORMAL,
    color: THEME.WHITE,
  },

  currentPrice: {
    fontSize: THEME.FONT_SIZE_LARGE,
  },

  highlight: {
    color: THEME.WHITE,
    fontWeight: 'bold',
  },

  label: {
    color: THEME.CONTRAST,
  },

  left: {
    flex: 1,
  },

  right: {
    textAlign: 'right',
  }
});
